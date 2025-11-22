import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Stage } from '@pixi/react';
import { useTranslation } from 'react-i18next';

import HeroIdleSprite from '@/game/heroes/_shared/HeroIdleSprite';
import { HeroDef, HeroId, Rarity } from '@/game/heroes';

type HeroCardProps = {
  hero: HeroDef;
  cellSize: number;
  rarityBg: string;
  selected: boolean;
  onClick?: () => void;
  showName?: boolean;
};

const HeroCard: React.FC<HeroCardProps> = ({
  hero,
  cellSize,
  rarityBg,
  selected,
  onClick,
  showName = true,
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
        {hero.owned ? (
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
        <div
          style={{
            marginTop: 4,
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 700,
            color: '#fff',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          {hero.name}
        </div>
      )}
    </div>
  );
};

type Props = {
  heroes: HeroDef[];
  squad: HeroId[];
  onBack: () => void;
  onChangeSquad: (next: HeroId[]) => void;
};

const rarityOrder: Rarity[] = ['legend', 'unique', 'rare'];
const rarityBg: Record<Rarity, string> = {
  legend: '#e74c3c',
  unique: '#9b59b6',
  rare: '#3498db',
};

const HeroesPage: React.FC<Props> = ({ heroes, squad, onBack, onChangeSquad }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
  const { t } = useTranslation();

  useEffect(() => {
    if (!rootRef.current) return;

    const update = () => {
      if (!rootRef.current) return;
      const r = rootRef.current.getBoundingClientRect();
      setStageSize({ w: r.width, h: r.height });
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(rootRef.current);

    window.addEventListener('resize', update);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const groups = useMemo(() => {
    const map: Record<Rarity, HeroDef[]> = { legend: [], unique: [], rare: [] };
    heroes.forEach((h) => map[h.rarity].push(h));
    return map;
  }, [heroes]);

  const safeW = Math.max(1, stageSize.w);
  const cellSize = Math.min(160, Math.floor(safeW / 4) - 12);
  const padding = 12;
  const topSquadHeight = cellSize + 60;

  const handleHeroClick = (heroId: HeroId) => {
    const isInSquad = squad.includes(heroId);
    
    if (isInSquad) {
      onChangeSquad(squad.filter((id) => id !== heroId));
    } else if (squad.length < 4) {
      onChangeSquad([...squad, heroId]);
    }
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
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          right: 12,
          zIndex: 2,
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
          {t('heroes.back')}
        </button>

        <div style={{ color: '#fff', fontWeight: 700 }}>
          {t('heroes.title')}
        </div>
      </div>

      {/* Squad section */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: padding,
          right: padding,
          height: topSquadHeight,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 14,
          padding: 10,
          boxSizing: 'border-box',
          zIndex: 1,
        }}
      >
        <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>
          {t('heroes.squad')}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {squad.map(id => {
            const hero = heroes.find(h => h.id === id);
            if (!hero) return null;
            return (
              <HeroCard
                key={id}
                hero={hero}
                cellSize={cellSize}
                rarityBg={rarityBg[hero.rarity]}
                selected={true}
                showName={true}
                onClick={() => onChangeSquad(squad.filter(x => x !== id))}
              />
            );
          })}
        </div>
      </div>

      {/* Scrollable heroes list */}
      <div
        className="scrollable"
        style={{
          position: 'absolute',
          top: 60 + topSquadHeight + 12,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: 'auto',
          padding: padding,
          boxSizing: 'border-box',
        }}
      >
        {rarityOrder.map((rar) => (
          <div key={rar} style={{ marginBottom: 14 }}>
            <div
              style={{
                color: '#fff',
                fontWeight: 800,
                margin: '6px 0 8px',
              }}
            >
              {t(`heroes.rarity.${rar}`)}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 10,
              }}
            >
              {groups[rar].map((h) => {
                const isInSquad = squad.includes(h.id);

                return (
                  <HeroCard
                    key={h.id}
                    hero={h}
                    cellSize={cellSize}
                    rarityBg={rarityBg[rar]}
                    selected={isInSquad}
                    onClick={() => handleHeroClick(h.id)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroesPage;
