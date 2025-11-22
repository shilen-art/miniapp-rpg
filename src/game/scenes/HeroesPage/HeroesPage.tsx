import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Stage, Container } from '@pixi/react';
import { useTranslation } from 'react-i18next';

import HeroIdleSprite from '@/game/heroes/_shared/HeroIdleSprite';
import { HeroDef, HeroId, Rarity } from '@/game/heroes/registry';

type Props = {
  heroes: HeroDef[];
  squad: HeroId[];
  onBack: () => void;
  onChangeSquad: (next: HeroId[]) => void; // пока не используем, оставляем
};

const rarityOrder: Rarity[] = ['legend', 'unique', 'rare'];
const rarityBg: Record<Rarity, string> = {
  legend: '#e74c3c',
  unique: '#9b59b6',
  rare: '#3498db',
};

const HeroesPage: React.FC<Props> = ({ heroes, squad, onBack }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
  const { t } = useTranslation();

  useEffect(() => {
    const update = () => {
      if (!rootRef.current) return;
      const r = rootRef.current.getBoundingClientRect();
      setStageSize({ w: r.width, h: r.height });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const groups = useMemo(() => {
    const map: Record<Rarity, HeroDef[]> = { legend: [], unique: [], rare: [] };
    heroes.forEach((h) => map[h.rarity].push(h));
    return map;
  }, [heroes]);

  const cellSize = Math.min(160, Math.floor(stageSize.w / 4) - 12);
  const padding = 12;
  const topSquadHeight = cellSize + 60;

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

        <div style={{ position: 'relative', width: '100%', height: cellSize + 10 }}>
          <Stage
            width={stageSize.w - padding * 2}
            height={cellSize + 10}
            options={{ backgroundAlpha: 0 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Container>
              {squad.map((id, i) => {
                const h = heroes.find((x) => x.id === id);
                if (!h) return null;

                const x = (i + 0.5) * ((stageSize.w - padding * 2) / 4);
                const y = (cellSize + 10) / 2;

                return (
                  <HeroIdleSprite
                    key={id}
                    src={h.idleSrc}
                    frames={h.frames}
                    frameSize={h.frameSize}
                    columns={h.columns}
                    x={x}
                    y={y}
                    scale={cellSize / 256 * 0.9}
                    speed={0.14}
                  />
                );
              })}
            </Container>
          </Stage>
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
              {groups[rar].map((h) => (
                <div
                  key={h.id}
                  style={{
                    background: rarityBg[rar],
                    borderRadius: 12,
                    padding: 6,
                    height: cellSize + 34,
                    boxSizing: 'border-box',
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: cellSize }}>
                    {h.owned ? (
                      <Stage
                        width={cellSize}
                        height={cellSize}
                        options={{ backgroundAlpha: 0 }}
                        style={{ position: 'absolute', inset: 0 }}
                      >
                        <HeroIdleSprite
                          src={h.idleSrc}
                          frames={h.frames}
                          frameSize={h.frameSize}
                          columns={h.columns}
                          x={cellSize / 2}
                          y={cellSize / 2}
                          scale={cellSize / 256}
                          speed={0.14}
                        />
                      </Stage>
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 8,
                          background: 'rgba(0,0,0,0.25)',
                        }}
                      />
                    )}
                  </div>

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
                    {h.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroesPage;

