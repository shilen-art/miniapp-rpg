import { Stage, Container } from '@pixi/react';
import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import HeroIdleSprite from '@/game/heroes/_shared/HeroIdleSprite';
import { HeroDef, HeroId } from '@/game/heroes/registry';
import mainBg from '@/shared/assets/backgrounds/main_background.jpg';
import FirefliesLayer from '@/shared/effects/FirefliesLayer';

type Props = {
  heroes: HeroDef[];
  squad: HeroId[];
  onOpenHeroes: () => void;
};

const MainPage: React.FC<Props> = ({ heroes, squad, onOpenHeroes }) => {
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

  const heroMap = useMemo(() => {
    const map = new Map<HeroId, HeroDef>();
    heroes.forEach((h) => map.set(h.id, h));
    return map;
  }, [heroes]);

  // Временные позиции под подиум (потом подгоним)
  const squadPositions = useMemo(
    () => [
      { x: stageSize.w * 0.22, y: stageSize.h * 0.67 },
      { x: stageSize.w * 0.40, y: stageSize.h * 0.64 },
      { x: stageSize.w * 0.60, y: stageSize.h * 0.64 },
      { x: stageSize.w * 0.78, y: stageSize.h * 0.67 },
    ],
    [stageSize.w, stageSize.h]
  );

  const rootStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  };

  const bgStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `url(${mainBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const stageStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    pointerEvents: 'none',
  };

  const bottomNavStyle: React.CSSProperties = {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    height: 96,
    background: 'rgba(20,20,20,0.9)',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    gap: 8,
    zIndex: 2,
  };

  const buttonStyle: React.CSSProperties = {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  };

  const iconStubStyle: React.CSSProperties = {
    width: 36,
    height: 36,
    backgroundColor: '#666',
    borderRadius: 10,
  };

  return (
    <div ref={rootRef} style={rootStyle}>
      {/* Background layer */}
      <div style={bgStyle} />

      {/* Pixi overlay: fireflies + squad */}
      <Stage
        width={stageSize.w}
        height={stageSize.h}
        options={{ backgroundAlpha: 0, antialias: true }}
        style={stageStyle}
      >
        <FirefliesLayer width={stageSize.w} height={stageSize.h} count={18} />

        <Container>
          {squad.map((id, i) => {
            const h = heroMap.get(id);
            const p = squadPositions[i];
            if (!h || !p) return null;

            return (
              <HeroIdleSprite
                key={id}
                src={h.idleSrc}
                frames={h.frames}
                frameSize={h.frameSize}
                columns={h.columns}
                x={p.x}
                y={p.y}
                scale={1}   // <= размер на главной
                speed={0.28}   // <= скорость idle
              />
            );
          })}
        </Container>
      </Stage>

      {/* Bottom navigation menu */}
      <div style={bottomNavStyle}>
        {Array.from({ length: 5 }).map((_, i) => {
          const isHeroes = i === 1;
          const label = isHeroes
            ? t('main.nav.heroes')
            : t(`main.nav.button${i + 1}`);

          return (
            <button
              key={i}
              type="button"
              onClick={isHeroes ? onOpenHeroes : undefined}
              style={buttonStyle}
            >
              <div style={iconStubStyle} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
