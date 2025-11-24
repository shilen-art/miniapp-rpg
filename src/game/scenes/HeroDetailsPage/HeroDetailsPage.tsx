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

// ONLY 4 slots now (no nftSet)
const EQUIP_SLOT_TYPES: EquipSlotKey[] = ['weapon', 'helm', 'armor', 'boots'];
const EQUIP_SLOT_LABELS: Record<EquipSlotKey, string> = {
  weapon: 'Оружие',
  helm: 'Шлем',
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
  hasMatchingItem?: boolean;
  onClick?: () => void;
}> = ({ label, value, hasMatchingItem = false, onClick }) => {
  const hasItem = !!value;
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        width: 70,
        height: 70,
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

const StatBlock: React.FC<{ label: string; value: string | number }> = ({ label, value }) => {
  return (
    <div
      style={{
        width: 70,
        height: 70,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      <div style={{ fontSize: 14, color: '#111' }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: '#111' }}>{value}</div>
    </div>
  );
};

const HeroDetailsPage: React.FC<Props> = ({ heroId, onBack }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
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

  const topAreaH = Math.max(110, safeH * 0.16);
  const bottomAreaH = Math.max(210, safeH * 0.26); // include nav

  const centerAreaTop = topAreaH + 52;
  const centerAreaBottom = bottomAreaH;
  const centerAreaH = Math.max(220, safeH - centerAreaTop - centerAreaBottom);

  const heroSpriteSize = Math.min(360, safeW * 0.52, centerAreaH * 0.9);
  const HERO_SHIFT = { x: -8, y: -10 };
  const idle = hero.sprites?.idle;

  const xpForNextLevel = 1000; // stub
  const xpPercent = owned ? Math.min(100, Math.floor((xp / xpForNextLevel) * 100)) : 0;
  const power: number | null = null; // TODO(stage power)

  const hasMatchingItem = false; // TODO(stage inventory)
  const heroClass = (hero as any).balance?.class;

  // Stats list (WITH attackInterval)
  const statItems = totalStats
    ? [
        { key: 'attack', label: 'Атака', value: totalStats.attack },
        { key: 'defense', label: 'Защита', value: totalStats.defense },
        { key: 'hp', label: 'Здоровье', value: totalStats.hp },
        { key: 'range', label: 'Дистанция атаки', value: totalStats.range },
        { key: 'crit', label: 'Крит', value: `${getCritPercent(totalStats)}%` },
        { key: 'ias', label: 'Скорость атаки', value: totalStats.attackInterval.toFixed(2) },
      ]
    : [];

  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        background: '#0B0D16',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: pad,
        boxSizing: 'border-box',
      }}
    >
      {/* MAIN CARD */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 760,
          height: '100%',
          borderRadius: 26,
          background: '#E9E6FB',
          boxShadow: '0 10px 40px rgba(0,0,0,0.45)',
          border: '4px solid #111',
          overflow: 'hidden',
        }}
      >
        {/* TOP AREA */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            height: topAreaH,
            padding: pad,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111' }}>{hero.name}</div>
            {heroClass && <div style={{ fontSize: 16, fontWeight: 600, color: '#333' }}>{heroClass}</div>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                background: rarityBadgeColors[rarity],
                color: '#fff',
                fontSize: 13,
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

        {/* POWER BADGE */}
        <div
          style={{
            position: 'absolute',
            top: topAreaH + 6,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#B98A34',
            color: '#fff',
            fontSize: 22,
            fontWeight: 900,
            padding: '8px 44px',
            borderRadius: 6,
            border: '3px solid #6D4A12',
            boxShadow: '0 2px 0 rgba(0,0,0,0.25)',
            zIndex: 3,
            minWidth: 180,
            textAlign: 'center',
          }}
        >
          {power ?? '—'}
        </div>

        {/* CENTER AREA (equip | hero | stats) */}
        <div
          style={{
            position: 'absolute',
            top: centerAreaTop,
            left: pad,
            right: pad,
            height: centerAreaH,
            display: 'grid',
            gridTemplateColumns: '120px 1fr 220px',
            gap: pad * 1.1,
            alignItems: 'stretch',
            boxSizing: 'border-box',
          }}
        >
          {/* LEFT: 4 vertical slots */}
          <div
            style={{
              height: '60%',
              display: 'grid',
              gridTemplateRows: `repeat(${EQUIP_SLOT_TYPES.length}, 1fr)`,
              gap: 10,
            }}
          >
            {EQUIP_SLOT_TYPES.map((slotType) => (
              <EquipSlot
                key={slotType}
                label={EQUIP_SLOT_LABELS[slotType]}
                value={equipmentSlots[slotType] ?? null}
                hasMatchingItem={hasMatchingItem}
                onClick={() => {
                  // TODO(stage equipment)
                }}
              />
            ))}
          </div>

          {/* CENTER: hero strictly centered */}
          <div
            style={{
              height: '60%',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <div
              style={{
                width: heroSpriteSize,
                height: heroSpriteSize,
                display: 'grid',
                placeItems: 'center',
              }}
            >
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
                    // standard size (scale=1 if not defined)
                    scale={idle.scale ?? 1}
                    speed={idle.speed ?? 0.28}
                  />
                </Stage>
              ) : (
                <div style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>
                  {owned ? 'Idle not found' : 'Not owned'}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: stats stacked (label top, value under), same full height */}
          <div
            style={{
              height: '60%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingTop: 8,
              paddingBottom: 8,
            }}
          >
            {statItems.length ? (
              statItems.map((s) => (
                <StatBlock key={s.key} label={s.label} value={s.value} />
              ))
            ) : (
              <div style={{ fontSize: 14, opacity: 0.7 }}>Нет данных</div>
            )}
          </div>
        </div>

        {/* BOTTOM GRAY ZONE */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: bottomAreaH,
            background: '#E6E6E6',
            borderTop: '3px solid rgba(0,0,0,0.15)',
            padding: pad,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {/* XP row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '36px 1fr 36px',
              gap: 8,
              alignItems: 'center',
              marginTop: 4,
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

          {/* Upgrade button 40% width */}
          <button
            onClick={() => {
              if (!owned) return;
              levelUpHero(heroId);
            }}
            disabled={!canUp}
            style={{
              marginTop: 6,
              width: '40%',
              minWidth: 220,
              maxWidth: 360,
              alignSelf: 'center',
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

          {/* Bottom navigation menu with back in it */}
          <div
            style={{
              marginTop: 'auto',
              height: 72,
              background: 'rgba(20,20,20,0.9)',
              borderRadius: 18,
              display: 'grid',
              gridTemplateColumns: '64px 1fr 1fr 1fr 1fr',
              alignItems: 'center',
              gap: 6,
              padding: '6px 8px',
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

            {(['Персонаж', 'Улучшение', 'Инвентарь', 'Герои'] as const).map((label, i) => (
              <button
                key={label}
                type="button"
                style={{
                  height: '100%',
                  borderRadius: 12,
                  background: 'transparent',
                  border: 'none',
                  color: i === 0 ? '#F2C94C' : '#fff',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.15)',
                  }}
                />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDetailsPage;
