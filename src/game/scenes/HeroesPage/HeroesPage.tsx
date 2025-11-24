// src/game/scenes/HeroesPage/HeroesPage.tsx
import { Stage } from '@pixi/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HeroDef, HeroId } from '@/game/heroes';
import HeroIdleSprite from '@/game/heroes/_shared/HeroIdleSprite';
import { useGameStore } from '@/game/state';
import TopResourcesBar from '@/game/ui/TopResourcesBar';
import HeroesNavBar from '@/game/ui/HeroesNavBar';

type HeroCardProps = {
  hero: HeroDef;
  cellSize: number;
  rarityBg: string;
  selected: boolean;
  onClick?: () => void;
  onNameClick?: () => void;
  showName?: boolean;
  owned: boolean;
  level?: number;
};

const HeroCard: React.FC<HeroCardProps> = ({
  hero,
  cellSize,
  rarityBg,
  selected,
  onClick,
  onNameClick,
  showName = true,
  owned,
}) => {
  const idle = hero.sprites.idle;
  const HERO_SHIFT = { x: -8, y: -10 };

  return (
    <div
      onClick={onClick}
      style={{
        background: rarityBg,
        borderRadius: 12,
        padding: 6,
        cursor: 'pointer',
        border: selected ? '3px solid #fff' : 'none',
        height: showName ? cellSize + 34 : cellSize + 12,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: cellSize }}>
        {owned ? (
          <Stage
            width={cellSize}
            height={cellSize}
            options={{ backgroundAlpha: 0 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <HeroIdleSprite
              src={idle.src}
              frames={idle.frames}
              frameSize={idle.frameSize}
              columns={idle.columns}
              x={(cellSize / 2) + HERO_SHIFT.x + (idle.offset?.x ?? 0)}
              y={(cellSize / 2) + HERO_SHIFT.y + (idle.offset?.y ?? 0)}
              scale={idle.scale ?? (cellSize / 256 * 1.5)}
              speed={idle.speed ?? 0.28}
            />
          </Stage>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 8,
              background: 'rgba(16, 4, 4, 0.25)',
            }}
          />
        )}
      </div>

      {showName !== false && (
        <div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onNameClick?.();
            }}
            style={{
              marginTop: 4,
              textAlign: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: '#fff',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              cursor: onNameClick ? 'pointer' : 'default',
            }}
          >
            {hero.name}
          </div>
        </div>
      )}
    </div>
  );
};

type InitialTab = 'character' | 'inventory';

type Props = {
  heroes: HeroDef[];
  squad: HeroId[];
  onBack: () => void;
  onChangeSquad: (next: HeroId[]) => void;
  onOpenHeroDetails: (heroId: HeroId, initialTab?: InitialTab) => void; // <-- changed
};

type UiRarity = 'hero' | 'legend' | 'unique' | 'rare';

type HeroRuntime = HeroDef & {
  isHero?: boolean;
  rank?: unknown;
  rarity?: unknown;
};

const normalizeRarity = (r: unknown): UiRarity => {
  const v = String(r ?? '').toLowerCase();
  if (v === 'hero') return 'hero';
  if (v === 'legend') return 'legend';
  if (v === 'unique') return 'unique';
  if (v === 'rare') return 'rare';
  if (v === 'gold') return 'legend';
  if (v === 'purple') return 'unique';
  if (v === 'green') return 'rare';
  return 'rare';
};

const getHeroRarity = (hero: HeroDef, storeHero?: { isHero?: boolean }): UiRarity => {
  const h = hero as HeroRuntime;

  if (
    storeHero?.isHero === true ||
    h.isHero === true ||
    String(h.rank ?? '').toLowerCase() === 'hero'
  ) {
    return 'hero';
  }

  const base = h.balance.rarity ?? h.rarity;
  return normalizeRarity(base);
};

const rarityOrder: UiRarity[] = ['hero', 'legend', 'unique', 'rare'];

const rarityBg: Record<UiRarity, string> = {
  hero: '#f1c40f',
  legend: '#e74d3d',
  unique: '#9b59b6',
  rare: '#3498dc',
};

const HeroesPage: React.FC<Props> = ({
  heroes,
  squad,
  onBack,
  onChangeSquad,
  onOpenHeroDetails,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
  const { t } = useTranslation();

  const isOwned = useGameStore((s) => s.isOwned);
  const heroesOwnedMap = useGameStore((s) => s.heroes);

  useEffect(() => {
    const update = () => {
      if (!rootRef.current) return;
      const r = rootRef.current.getBoundingClientRect();
      setStageSize({ w: r.width, h: r.height });
    };

    update();

    const RO = window.ResizeObserver;
    let resizeObserver: ResizeObserver | null = null;

    if (RO && rootRef.current) {
      resizeObserver = new RO(update);
      resizeObserver.observe(rootRef.current);
    }

    window.addEventListener('resize', update);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const groups = useMemo(() => {
    const map: Record<UiRarity, HeroDef[]> = {
      hero: [],
      legend: [],
      unique: [],
      rare: [],
    };

    heroes.forEach((h) => {
      const storeHero = heroesOwnedMap[h.id];
      const rar = getHeroRarity(h, storeHero);
      map[rar].push(h);
    });

    return map;
  }, [heroes, heroesOwnedMap]);

  const safeW = Math.max(1, stageSize.w);
  const cellSize = Math.min(160, Math.floor(safeW / 4) - 12);
  const padding = 12;
  const bottomNavH = 72;
  const TOP_BAR_H = 56;

  const handleHeroClick = (heroId: HeroId) => {
    const isInSquad = squad.includes(heroId);

    if (isInSquad) {
      onChangeSquad(squad.filter((id) => id !== heroId));
    } else if (squad.length < 4 && isOwned(heroId)) {
      onChangeSquad([...squad, heroId]);
    }
  };

  // first squad hero or first owned hero fallback
  const fallbackHeroId: HeroId | undefined =
    squad[0] ?? heroes.find((h) => isOwned(h.id))?.id;

  const openFallback = (tab: InitialTab) => {
    if (!fallbackHeroId) return;
    onOpenHeroDetails(fallbackHeroId, tab);
  };

  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#0b0d16',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ position: 'relative', height: TOP_BAR_H, flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <TopResourcesBar />
        </div>
      </div>

      <div
        style={{
          padding: `${padding}px ${padding}px 8px`,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ color: '#fff', fontWeight: 700 }}>
          {t('heroes.title')}
        </div>
      </div>

      <div
        style={{
          margin: `0 ${padding}px ${padding}px`,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 14,
          padding: 10,
          boxSizing: 'border-box',
          flexShrink: 0,
        }}
      >
        <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>
          {t('heroes.squad')}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {squad.map((id) => {
            const hero = heroes.find((h) => h.id === id);
            if (!hero) return null;

            const storeHero = heroesOwnedMap[id];
            const rar = getHeroRarity(hero, storeHero);
            const owned = isOwned(id);

            return (
              <HeroCard
                key={id}
                hero={hero}
                cellSize={cellSize}
                rarityBg={rarityBg[rar]}
                selected
                showName
                owned={owned}
                onClick={() => onOpenHeroDetails(id, 'character')}
                onNameClick={() => handleHeroClick(id)}
              />
            );
          })}

          {Array.from({ length: Math.max(0, 4 - squad.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              style={{
                height: cellSize + 34,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed rgba(255,255,255,0.12)',
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="scrollable"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding,
          paddingBottom: bottomNavH + padding,
          boxSizing: 'border-box',
        }}
      >
        {rarityOrder.map((rar) => {
          const list = groups[rar];
          if (!list || list.length === 0) return null;

          return (
            <div key={rar} style={{ marginBottom: 14 }}>
              <div
                style={{
                  color: '#fff',
                  fontWeight: 800,
                  margin: '6px 0 8px',
                }}
              >
                {t(`heroes.rarity.${rar}`, rar)}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 10,
                }}
              >
                {list.map((h) => {
                  const isInSquad = squad.includes(h.id);
                  const storeHero = heroesOwnedMap[h.id];
                  const hr = getHeroRarity(h, storeHero);
                  const owned = isOwned(h.id);

                  return (
                    <HeroCard
                      key={h.id}
                      hero={h}
                      cellSize={cellSize}
                      rarityBg={rarityBg[hr]}
                      selected={isInSquad}
                      owned={owned}
                      onClick={() => onOpenHeroDetails(h.id, 'character')}
                      onNameClick={() => handleHeroClick(h.id)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <HeroesNavBar
        activeTab="heroes"
        onBack={onBack}
        onOpenCharacter={() => openFallback('character')}
        onOpenInventory={() => openFallback('inventory')}
        onOpenHeroes={undefined}
      />
    </div>
  );
};

export default HeroesPage;
