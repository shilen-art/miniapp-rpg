// src/game/scenes/HeroDetailsPage/HeroDetailsPage.tsx
import { Stage } from '@pixi/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getBaseStats, getCritPercent } from '@/game/heroes/calc';
import { HEROES_REGISTRY, HeroDef, HeroId } from '@/game/heroes';
import HeroIdleSprite from '@/game/heroes/_shared/HeroIdleSprite';
import { useGameStore } from '@/game/state';
import TopResourcesBar from '@/game/ui/TopResourcesBar';

type Props = {
  heroId: HeroId;
  onBack: () => void;
  onOpenHeroes?: () => void; // если не передали — упадем на onBack()
};

type UiRarity = 'hero' | 'legend' | 'unique' | 'rare';
type EquipSlotKey = 'weapon' | 'jewelry' | 'armor' | 'boots' | 'nftSet';

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
  hero: 'Герой',
  legend: 'Легендарный',
  unique: 'Уникальный',
  rare: 'Редкий',
};

const rarityBadgeColors: Record<UiRarity, string> = {
  hero: '#F2C94C',
  legend: '#EB5757',
  unique: '#BB6BD9',
  rare: '#6FCF97',
};

const EQUIP_SLOT_LABELS: Record<EquipSlotKey, string> = {
  weapon: 'Оружие',
  jewelry: 'Бижутерия',
  armor: 'Броня',
  boots: 'Сапоги',
  nftSet: 'NFT Сет',
};

const StarRating: React.FC<{ stars: number }> = ({ stars }) => {
  const filled = Math.max(0, Math.min(5, stars));
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: 16,
            lineHeight: '16px',
            color: i < filled ? '#F2C94C' : 'rgba(0,0,0,0.25)',
          }}
        >
          {i < filled ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

const EquipSlot: React.FC<{
  label: string;
  value?: string | null;
  size: number;
  hasMatchingItem?: boolean;
  onClick?: () => void;
}> = ({ label, value, size, hasMatchingItem = false, onClick }) => {
  const hasItem = !!value;
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: 10,
        border: '2px solid #7AC87A',
        background: hasItem ? 'rgba(122,200,122,0.10)' : 'rgba(122,200,122,0.05)',
        color: '#1e2a1e',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8px 10px',
        textAlign: 'left',
        boxSizing: 'border-box',
      }}
    >
      {hasMatchingItem && (
        <div
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#FF4D4D',
          }}
        />
      )}
      <div style={{ fontSize: 12, fontWeight: 800 }}>{label}</div>
      <div style={{ fontSize: 11, opacity: 0.7 }}>{hasItem ? value : 'Пусто'}</div>
    </button>
  );
};

const StatCell: React.FC<{ label: string; value: string | number }> = ({ label, value }) => {
  return (
    <div
      style={{
        minHeight: 58,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        padding: '6px 4px',
        boxSizing: 'border-box',
        borderRadius: 8,
        background: 'rgba(255,255,255,0.55)',
        border: '2px solid rgba(0,0,0,0.12)',
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 800, color: '#111', textAlign: 'center' }}>
        {label}
      </div>
      <div style={{ fontSize: 16, fontWeight: 900, color: '#111' }}>{value}</div>
    </div>
  );
};

type BottomTab = 'character' | 'upgrade' | 'inventory' | 'heroes';

const HeroDetailsPage: React.FC<Props> = ({ heroId, onBack, onOpenHeroes }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
  const [activeTab, setActiveTab] = useState<BottomTab>('character');
  const { t } = useTranslation();

  const heroesOwnedMap = useGameStore((s) => s.heroes);
  const isOwned = useGameStore((s) => s.isOwned);
  const meat = useGameStore((s) => s.resources.meat);
  const levelUpHero = useGameStore((s) => s.levelUpHero);

  const hero = useMemo(() => HEROES_REGISTRY.find((h) => h.id === heroId), [heroId]);
  const storeHero = useMemo(() => heroesOwnedMap[heroId], [heroesOwnedMap, heroId]);

  const owned = isOwned(heroId);
  const level = storeHero?.level ?? 1;
  const xp = storeHero?.xp ?? 0;
  const stars = storeHero?.stars ?? 0;

  const meatCost = useMemo(() => 5 * level, [level]);
  const canUp = owned && meat >= meatCost;

  const equipmentSlots = useMemo(() => {
    return (storeHero?.equipmentSlots ?? {}) as Partial<Record<EquipSlotKey, string | null>>;
  }, [storeHero]);

  const baseStats = useMemo(() => {
    if (!hero || !owned) return null;
    return getBaseStats(hero, level);
  }, [hero, owned, level]);

  const totalStats = useMemo(() => {
    if (!baseStats) return null;
    return baseStats; // TODO(stage equipment): add bonuses
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
    let ro: ResizeObserver | null = null;
    if (rootRef.current && window.ResizeObserver) {
      ro = new window.ResizeObserver(update);
      ro.observe(rootRef.current);
    }
    window.addEventListener('resize', update);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!hero) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
        Hero not found
      </div>
    );
  }

  const safeW = Math.max(1, stageSize.w);
  const safeH = Math.max(1, stageSize.h);

  const pad = Math.max(10, Math.min(18, safeW * 0.035));
  const slotSize = Math.max(56, Math.min(72, safeW * 0.12));
  const heroSpriteSize = Math.min(340, safeW * 0.46, safeH * 0.30);
  const HERO_SHIFT = { x: -8, y: -10 };
  const idle = hero.sprites?.idle;

  const xpForNextLevel = 1000; // stub
  const xpPercent = owned ? Math.min(100, Math.floor((xp / xpForNextLevel) * 100)) : 0;
  const power: number | null = null; // TODO(stage power)
  const hasMatchingItem = false; // TODO(stage inventory)
  const heroClass = (hero as any).balance?.class;

  const statItems = totalStats
    ? [
        { key: 'attack', label: 'Атака', value: totalStats.attack },
        { key: 'defense', label: 'Защита', value: totalStats.defense },
        { key: 'hp', label: 'Здоровье', value: totalStats.hp },
        { key: 'range', label: 'Дистанция', value: totalStats.range },
        { key: 'crit', label: 'Крит', value: `${getCritPercent(totalStats)}%` },
        { key: 'ias', label: 'Скорость', value: totalStats.attackInterval.toFixed(2) },
      ]
    : [];

  // --- FIX 2: centered + lower upgrade content ---
  const renderUpgradeBlock = () => (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        boxSizing: 'border-box',
        paddingTop: 18, // опускаем чуть ниже
        paddingBottom: 10,
      }}
    >
      {/* XP row */}
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '36px 1fr 36px',
          gap: 8,
          alignItems: 'center',
        }}
      >
        <button
          disabled
          style={{
            width: 36,
            height: 26,
            borderRadius: 8,
            border: '2px solid rgba(0,0,0,0.2)',
            background: '#DADADA',
            opacity: 0.6,
            cursor: 'not-allowed',
            fontSize: 16,
            fontWeight: 900,
          }}
        >
          ←
        </button>

        <div
          style={{
            position: 'relative',
            height: 26,
            borderRadius: 13,
            background: '#FFF4B8',
            border: '2px solid rgba(0,0,0,0.25)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
            fontWeight: 900,
            color: '#111',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${xpPercent}%`,
              background: '#F2C94C',
            }}
          />
          <div style={{ position: 'relative', zIndex: 2, fontSize: 14 }}>Lvl {level}</div>
          <div style={{ position: 'relative', zIndex: 2, marginLeft: 'auto', fontSize: 14 }}>
            {owned ? `${xpPercent}%` : '0%'}
          </div>
        </div>

        <button
          disabled
          style={{
            width: 36,
            height: 26,
            borderRadius: 8,
            border: '2px solid rgba(0,0,0,0.2)',
            background: '#DADADA',
            opacity: 0.6,
            cursor: 'not-allowed',
            fontSize: 16,
            fontWeight: 900,
          }}
        >
          →
        </button>
      </div>

      {/* centered button */}
      <button
        onClick={() => {
          if (!owned) return;
          levelUpHero(heroId);
        }}
        disabled={!canUp}
        style={{
          width: '40%',
          minWidth: 220,
          maxWidth: 360,
          height: 56,
          borderRadius: 28,
          border: '3px solid rgba(0,0,0,0.32)',
          background: canUp ? '#69C56A' : '#A0A0A0',
          color: '#fff',
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: 0.5,
          cursor: canUp ? 'pointer' : 'not-allowed',
          opacity: canUp ? 1 : 0.8,
          boxShadow: '0 2px 0 rgba(0,0,0,0.18)',
        }}
      >
        {t('heroes.levelUp', 'Level Up')}
      </button>

      {/* meat cost */}
      <div
        style={{
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 800,
          color: '#111',
        }}
      >
        {t('heroes.meatCost', {
          defaultValue: '{{have}} / {{cost}} Meat',
          have: meat,
          cost: meatCost,
        })}
      </div>
    </div>
  );

  const INVENTORY_COLS = 6;
  const INVENTORY_ROWS = 3;

  // --- FIX 1: 6x3 squares, not huge ---
  const renderInventoryBlock = () => (
    <div
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(${INVENTORY_COLS}, 1fr)`,
        gap: 6,
        alignContent: 'start',
        boxSizing: 'border-box',
      }}
    >
      {Array.from({ length: INVENTORY_COLS * INVENTORY_ROWS }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '100%',
            aspectRatio: '1 / 1', // квадрат
            borderRadius: 8,
            border: '3px solid #7A4A1A',
            background: 'rgba(255,255,255,0.25)',
            boxSizing: 'border-box',
          }}
        />
      ))}
    </div>
  );

  const bottomTabs: Array<{ key: BottomTab; label: string; enabled?: boolean }> = [
    { key: 'character', label: 'Персонаж', enabled: true },
    { key: 'inventory', label: 'Инвентарь', enabled: true },
    { key: 'heroes', label: 'Герои', enabled: true },
    { key: 'upgrade', label: 'Улучшение', enabled: false },
  ];

  const renderBottomNav = () => (
    <div
      style={{
        height: 72,
        background: 'rgba(20,20,20,0.9)',
        display: 'grid',
        gridTemplateColumns: '64px 1fr 1fr 1fr',
        alignItems: 'center',
        gap: 6,
        padding: '6px 8px',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    >
      <button
        onClick={onBack}
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: '3px solid #111',
          background: '#FFF',
          display: 'grid',
          placeItems: 'center',
          fontSize: 22,
          cursor: 'pointer',
        }}
        aria-label="back"
      >
        ←
      </button>

      {bottomTabs
        .filter((t) => t.enabled)
        .map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => {
              if (tab.key === 'heroes') {
                (onOpenHeroes ?? onBack)(); // FIX 3: кликабельно и ведёт на список героев
                return;
              }
              setActiveTab(tab.key);
            }}
            style={{
              height: '100%',
              borderRadius: 12,
              background: 'transparent',
              border: 'none',
              color: activeTab === tab.key ? '#F2C94C' : '#fff',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              opacity: activeTab === tab.key ? 1 : 0.9,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                background:
                  activeTab === tab.key
                    ? 'rgba(242,201,76,0.25)'
                    : 'rgba(255,255,255,0.15)',
              }}
            />
            <span>{tab.label}</span>
          </button>
        ))}
    </div>
  );

  const TOP_BAR_H = 56;
  const BOTTOM_NAV_H = 72;
  const heroSectionH =
    safeH > 0 ? Math.max(220, (safeH - TOP_BAR_H - BOTTOM_NAV_H) * 0.65) : undefined;

  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#E9E6FB',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* 1) TOP RESOURCES BAR with reserved height */}
      <div style={{ position: 'relative', height: TOP_BAR_H, flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <TopResourcesBar />
        </div>
      </div>

      {/* 2) MAIN HERO SECTION (~65%) */}
      <div
        style={{
          height: heroSectionH,
          flexShrink: 0,
          padding: pad,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          boxSizing: 'border-box',
        }}
      >
        {/* 3) NAME / CLASS / RARITY / STARS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#111' }}>{hero.name}</div>
            {heroClass && (
              <div style={{ fontSize: 15, fontWeight: 700, color: '#333' }}>{heroClass}</div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                background: rarityBadgeColors[rarity],
                color: '#fff',
                fontSize: 12,
                fontWeight: 900,
                padding: '4px 8px',
                borderRadius: 6,
                textTransform: 'uppercase',
                letterSpacing: 0.4,
              }}
            >
              {rarityLabels[rarity]}
            </div>

            <StarRating stars={stars} />
          </div>
        </div>

        {/* 4) POWER BADGE */}
        <div
          style={{
            alignSelf: 'center',
            background: '#B98A34',
            color: '#fff',
            fontSize: 20,
            fontWeight: 900,
            padding: '8px 36px',
            borderRadius: 6,
            border: '3px solid #6D4A12',
            boxShadow: '0 2px 0 rgba(0,0,0,0.25)',
            minWidth: 160,
            textAlign: 'center',
          }}
        >
          {power ?? '—'}
        </div>

        {/* 5) HERO VISUAL BLOCK */}
        <div
          style={{
            marginTop: 2,
            display: 'grid',
            gridTemplateColumns: `${slotSize}px 1fr ${slotSize}px`,
            gap: pad,
            alignItems: 'center',
            boxSizing: 'border-box',
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* left column */}
          <div
            style={{
              display: 'grid',
              gridAutoRows: 'min-content',
              gap: 10,
              justifyItems: 'center',
            }}
          >
            {(['weapon', 'jewelry'] as EquipSlotKey[]).map((slotType) => (
              <EquipSlot
                key={slotType}
                label={EQUIP_SLOT_LABELS[slotType]}
                value={equipmentSlots[slotType] ?? null}
                hasMatchingItem={hasMatchingItem}
                size={slotSize}
                onClick={() => {
                  // TODO(stage equipment)
                }}
              />
            ))}
          </div>

          {/* hero center */}
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              minHeight: heroSpriteSize,
            }}
          >
            <div style={{ width: heroSpriteSize, height: heroSpriteSize }}>
              {owned && idle ? (
                <Stage
                  width={heroSpriteSize}
                  height={heroSpriteSize}
                  options={{ backgroundAlpha: 0 }}
                  style={{ width: heroSpriteSize, height: heroSpriteSize }}
                >
                  <HeroIdleSprite
                    src={idle.src}
                    frames={idle.frames}
                    frameSize={idle.frameSize}
                    columns={idle.columns}
                    x={(heroSpriteSize / 2) + HERO_SHIFT.x + (idle.offset?.x ?? 0)}
                    y={(heroSpriteSize / 2) + HERO_SHIFT.y + (idle.offset?.y ?? 0)}
                    scale={idle.scale ?? 1}
                    speed={idle.speed ?? 0.28}
                  />
                </Stage>
              ) : (
                <div style={{ fontSize: 14, fontWeight: 700, color: '#333', textAlign: 'center' }}>
                  {owned ? 'Idle not found' : 'Not owned'}
                </div>
              )}
            </div>
          </div>

          {/* right column */}
          <div
            style={{
              display: 'grid',
              gridAutoRows: 'min-content',
              gap: 10,
              justifyItems: 'center',
            }}
          >
            {(['armor', 'boots'] as EquipSlotKey[]).map((slotType) => (
              <EquipSlot
                key={slotType}
                label={EQUIP_SLOT_LABELS[slotType]}
                value={equipmentSlots[slotType] ?? null}
                hasMatchingItem={hasMatchingItem}
                size={slotSize}
                onClick={() => {
                  // TODO(stage equipment)
                }}
              />
            ))}
          </div>
        </div>

        {/* 6) STATS HORIZONTAL BLOCK */}
        <div
          style={{
            marginTop: 4,
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 6,
            boxSizing: 'border-box',
          }}
        >
          {statItems.length ? (
            statItems.map((s) => <StatCell key={s.key} label={s.label} value={s.value} />)
          ) : (
            <div style={{ fontSize: 14, opacity: 0.7 }}>Нет данных</div>
          )}
        </div>
      </div>

      {/* 3) BOTTOM GRAY ZONE (rest of space) */}
      <div
        style={{
          background: '#E6E6E6',
          borderTop: '3px solid rgba(0,0,0,0.15)',
          padding: pad,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          gap: 8,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
          }}
        >
          {activeTab === 'inventory' ? renderInventoryBlock() : renderUpgradeBlock()}
        </div>
      </div>

      {/* 4) BOTTOM NAVIGATION */}
      {renderBottomNav()}
    </div>
  );
};

export default HeroDetailsPage;
