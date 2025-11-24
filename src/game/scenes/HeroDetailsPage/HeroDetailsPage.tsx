// src/game/scenes/HeroDetailsPage/HeroDetailsPage.tsx
import { Stage } from '@pixi/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getBaseStats, getCritPercent } from '@/game/heroes/calc';
import { HEROES_REGISTRY, HeroDef, HeroId } from '@/game/heroes';
import HeroIdleSprite from '@/game/heroes/_shared/HeroIdleSprite';
import { useGameStore } from '@/game/state';

type Props = {
  heroId: HeroId;
  onBack: () => void;
};

type UiRarity = 'hero' | 'legend' | 'unique' | 'rare';
type EquipSlotKey = 'weapon' | 'helm' | 'armor' | 'boots' | 'nftSet';

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
  const heroRarityRaw = (hero as any).balance?.rarity;
  if (storeHero?.isHero === true || String(heroRarityRaw ?? '').toLowerCase() === 'hero') {
    return 'hero';
  }
  return normalizeRarity(heroRarityRaw);
};

const rarityLabels: Record<UiRarity, string> = {
  hero: 'Hero',
  legend: 'Legend',
  unique: 'Unique',
  rare: 'Rare',
};

const rarityColors: Record<UiRarity, string> = {
  hero: '#f1c40f',
  legend: '#e74d3d',
  unique: '#9b59b6',
  rare: '#3498dc',
};

const EQUIP_SLOT_TYPES: EquipSlotKey[] = ['weapon', 'helm', 'armor', 'boots', 'nftSet'];

const EQUIP_SLOT_LABELS: Record<EquipSlotKey, string> = {
  weapon: 'Weapon',
  helm: 'Helm',
  armor: 'Armor',
  boots: 'Boots',
  nftSet: 'NFT Set',
};

const HeroDetailsPage: React.FC<Props> = ({ heroId, onBack }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
  const { t } = useTranslation();

  const heroesOwnedMap = useGameStore((s) => s.heroes);
  const isOwned = useGameStore((s) => s.isOwned);

  const hero = useMemo(() => HEROES_REGISTRY.find((h) => h.id === heroId), [heroId]);
  const storeHero = useMemo(() => heroesOwnedMap[heroId], [heroesOwnedMap, heroId]);

  const owned = isOwned(heroId);
  const level = storeHero?.level ?? 1;
  const xp = storeHero?.xp ?? 0;
  const stars = storeHero?.stars ?? 0;

  const equipmentSlots = useMemo(() => {
    return ((storeHero?.equipmentSlots ?? {}) as Partial<Record<EquipSlotKey, string | null>>);
  }, [storeHero]);

  const baseStats = useMemo(() => {
    if (!hero || !owned) return null;
    return getBaseStats(hero, level);
  }, [hero, owned, level]);

  const totalStats = useMemo(() => {
    if (!baseStats) return null;
    // TODO(stage equipment): add equipment + set + research bonuses into total stats
    return baseStats;
  }, [baseStats]);

  const rarity = useMemo(() => {
    if (!hero) return 'rare' as UiRarity;
    return getHeroRarity(hero, storeHero);
  }, [hero, storeHero]);

  useEffect(() => {
    const update = () => {
      if (!rootRef.current) return;
      const r = rootRef.current.getBoundingClientRect();
      setStageSize({ w: r.width, h: r.height });
    };

    update();

    let resizeObserver: ResizeObserver | null = null;
    if (rootRef.current && window.ResizeObserver) {
      resizeObserver = new window.ResizeObserver(update);
      resizeObserver.observe(rootRef.current);
    }

    window.addEventListener('resize', update);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!hero) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0b0d16',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        Hero not found
      </div>
    );
  }

  const safeW = Math.max(1, stageSize.w);
  const safeH = Math.max(1, stageSize.h);
  const padding = 12;

  const heroSpriteSize = Math.min(300, safeW * 0.6, safeH * 0.4);
  const HERO_SHIFT = { x: -8, y: -10 };
  const idle = hero.sprites?.idle;

  // XP calculation stub
  // TODO(stage xp): implement proper XP calculation and max level
  const xpForNextLevel = 1000; // stub
  const xpPercent = owned ? Math.min(100, Math.floor((xp / xpForNextLevel) * 100)) : 0;

  // Power calculation stub
  // TODO(stage power): implement power calculation
  const power: number | null = null;

  // Navigation prev/next stub
  // TODO(stage heroes-nav): add prev/next navigation by owned heroes
  const canGoPrev = false;
  const canGoNext = false;
  const handlePrev = () => {
    // TODO(stage heroes-nav): implement prev navigation
  };
  const handleNext = () => {
    // TODO(stage heroes-nav): implement next navigation
  };

  // Red dot indicator stub
  const hasMatchingItem = false;
  // TODO(stage inventory): show red dot when matching item exists in inventory

  const heroClass = (hero as any).balance?.class;

  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#0b0d16',
        overflow: 'hidden',
      }}
    >
      {/* Header with back button */}
      <div
        style={{
          position: 'absolute',
          top: padding,
          left: padding,
          right: padding,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <button
          onClick={onBack}
          style={{
            height: 36,
            padding: '0 12px',
            borderRadius: 10,
            border: 'none',
            background: '#222',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {t('heroes.back', 'Back')}
        </button>
      </div>

      {/* Top zone: Name, Class, Rarity, Stars */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: padding,
          right: padding,
          zIndex: 5,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              color: '#fff',
              fontSize: 24,
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {hero.name}
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {heroClass && (
              <div
                style={{
                  padding: '4px 12px',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}
              >
                {heroClass}
              </div>
            )}

            <div
              style={{
                padding: '4px 12px',
                borderRadius: 8,
                background: rarityColors[rarity],
                color: '#fff',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {rarityLabels[rarity]}
            </div>

            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>
                {stars}/5
              </span>
              {/* TODO(stage stars): add star icons/visualization */}
            </div>
          </div>
        </div>
      </div>

      {/* Central zone: Hero sprite and Power */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          Power: {power !== null ? power : '—'}
        </div>

        {owned && idle ? (
          <div style={{ width: heroSpriteSize, height: heroSpriteSize, position: 'relative' }}>
            <Stage
              width={heroSpriteSize}
              height={heroSpriteSize}
              options={{ backgroundAlpha: 0 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <HeroIdleSprite
                src={idle.src}
                frames={idle.frames}
                frameSize={idle.frameSize}
                columns={idle.columns}
                x={(heroSpriteSize / 2) + HERO_SHIFT.x + (idle.offset?.x ?? 0)}
                y={(heroSpriteSize / 2) + HERO_SHIFT.y + (idle.offset?.y ?? 0)}
                scale={idle.scale ?? (heroSpriteSize / 256 * 1.5)}
                speed={idle.speed ?? 0.28}
              />
            </Stage>
          </div>
        ) : (
          <div
            style={{
              width: heroSpriteSize,
              height: heroSpriteSize,
              borderRadius: 8,
              background: 'rgba(16, 4, 4, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 14,
            }}
          >
            {owned ? 'Idle not found' : 'Not owned'}
          </div>
        )}
      </div>

      {/* Left column: Equipment slots */}
      <div
        style={{
          position: 'absolute',
          left: padding,
          top: 180,
          bottom: 120,
          width: Math.min(200, safeW * 0.35),
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
          Equipment
        </div>

        {EQUIP_SLOT_TYPES.map((slotType) => {
          const slotValue = equipmentSlots[slotType];
          const hasItem = !!slotValue;

          return (
            <div
              key={slotType}
              style={{
                position: 'relative',
                padding: 12,
                borderRadius: 10,
                background: hasItem ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                border: hasItem ? '2px solid rgba(255,255,255,0.2)' : '2px dashed rgba(255,255,255,0.1)',
                cursor: 'pointer',
                minHeight: 60,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              onClick={() => {
                // TODO(stage equipment): handle equipment slot click
              }}
            >
              {hasMatchingItem && (
                <div
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#ff0000',
                  }}
                />
              )}

              <div style={{ color: '#fff', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                {EQUIP_SLOT_LABELS[slotType]}
              </div>

              {hasItem ? (
                <div style={{ color: '#fff', fontSize: 10, opacity: 0.8 }}>{slotValue}</div>
              ) : (
                <div style={{ color: '#fff', fontSize: 10, opacity: 0.5 }}>Empty</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right column: Stats */}
      <div
        style={{
          position: 'absolute',
          right: padding,
          top: 180,
          bottom: 120,
          width: Math.min(200, safeW * 0.35),
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
          Stats
        </div>

        {totalStats ? (
          <>
            <StatRow label="Attack" value={totalStats.attack} />
            <StatRow label="HP" value={totalStats.hp} />
            <StatRow label="Defense" value={totalStats.defense} />
            <StatRow label="Range" value={totalStats.range} />
            <StatRow label="Crit" value={`${getCritPercent(totalStats)}%`} />
            <StatRow label="Attack Speed" value={totalStats.attackInterval.toFixed(2)} />
          </>
        ) : (
          <div style={{ color: '#fff', opacity: 0.5, fontSize: 12 }}>No stats available</div>
        )}
      </div>

      {/* Bottom: XP bar, Level, Prev/Next navigation */}
      <div
        style={{
          position: 'absolute',
          left: padding,
          right: padding,
          bottom: padding,
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>
              Level {level}
            </div>
            {owned && (
              <div style={{ color: '#fff', fontSize: 12, opacity: 0.8 }}>
                {xpPercent}%
              </div>
            )}
          </div>

          {owned ? (
            <div
              style={{
                width: '100%',
                height: 8,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.1)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: `${xpPercent}%`,
                  height: '100%',
                  background: '#4CAF50',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                height: 8,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.05)',
              }}
            />
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            onClick={undefined}
            disabled
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.3)',
              cursor: 'not-allowed',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            ← Prev
          </button>

          <button
            onClick={undefined}
            disabled
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.3)',
              cursor: 'not-allowed',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

type StatRowProps = {
  label: string;
  value: string | number;
};

const StatRow: React.FC<StatRowProps> = ({ label, value }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 12px',
        borderRadius: 8,
        background: 'rgba(255,255,255,0.05)',
      }}
    >
      <span style={{ color: '#fff', fontSize: 12, opacity: 0.8 }}>{label}</span>
      <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{value}</span>
    </div>
  );
};

export default HeroDetailsPage;
