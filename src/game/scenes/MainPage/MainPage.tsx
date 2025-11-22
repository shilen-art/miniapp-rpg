import React, { useMemo } from 'react';
import { Stage, Container } from '@pixi/react';
import { useTranslation } from 'react-i18next';

import mainBg from '@/shared/assets/backgrounds/main_background.jpg';
import { useWindowSize } from '@/shared/lib/useWindowSize';
import FirefliesLayer from '@/shared/effects/FirefliesLayer';
import HeroIdleSprite from '@/game/heroes/_shared/HeroIdleSprite';
import { HeroDef, HeroId } from '@/game/heroes/registry';

type Props = {
  heroes: HeroDef[];
  squad: HeroId[];
  onOpenHeroes: () => void;
};

const MainPage: React.FC<Props> = ({ heroes, squad, onOpenHeroes }) => {
  const { width, height } = useWindowSize();
  const { t } = useTranslation();

  const heroMap = useMemo(() => {
    const map = new Map<HeroId, HeroDef>();
    heroes.forEach((h) => map.set(h.id, h));
    return map;
  }, [heroes]);

  // Временные позиции под подиум (потом подгоним)
  const squadPositions = useMemo(
    () => [
      { x: width * 0.22, y: height * 0.67 },
      { x: width * 0.40, y: height * 0.64 },
      { x: width * 0.60, y: height * 0.64 },
      { x: width * 0.78, y: height * 0.67 },
    ],
    [width, height]
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
    <div style={rootStyle}>
      {/* Background layer */}
      <div style={bgStyle} />

      {/* Pixi overlay: fireflies + squad */}
      <Stage
        width={width}
        height={height}
        options={{ backgroundAlpha: 0, antialias: true }}
        style={stageStyle}
      >
        <FirefliesLayer width={width} height={height} count={18} />

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
