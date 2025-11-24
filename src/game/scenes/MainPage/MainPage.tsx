import { Stage, Container } from '@pixi/react';
import React, { useMemo, useRef, useEffect, useState } from 'react';

import HeroIdleSprite from '@/game/heroes/_shared/HeroIdleSprite';
import { HeroDef, HeroId } from '@/game/heroes';
import MainNavBar from '@/game/ui/MainNavBar';
import mainBg from '@/shared/assets/backgrounds/main_background.jpg';
import FirefliesLayer from '@/shared/effects/FirefliesLayer';
import { useTelegramWebApp } from '@/telegram';

type Props = {
  heroes: HeroDef[];
  squad: HeroId[];
  onOpenHeroes: () => void;
  onOpenSummon?: () => void;
};

const MainPage: React.FC<Props> = ({ heroes, squad, onOpenHeroes, onOpenSummon }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
  const { contentSafeAreaInset } = useTelegramWebApp();

  useEffect(() => {
    if (!rootRef.current) return;

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

  const heroMap = useMemo(() => {
    const map = new Map<HeroId, HeroDef>();
    heroes.forEach((h) => map.set(h.id, h));
    return map;
  }, [heroes]);

  const bottomNavHeight = 96;
  const extraSafeBottom = contentSafeAreaInset?.bottom ?? 0;
  const navTotalHeight = bottomNavHeight + 16 + extraSafeBottom; // nav height + bottom margin + safe area

  const squadPositions = useMemo(() => {
    const safeW = Math.max(1, stageSize.w);
    const safeH = Math.max(1, stageSize.h);
    const visibleH = safeH - navTotalHeight;

    // Keep the same relative spread in X, but adjust Y based on visible height
    // Original Y positions were at 0.64-0.67 of full height
    // Now place them relative to visibleH, keeping similar relative positions
    const baseY = visibleH * 0.67; // Base Y position relative to visible area

    return [
      { x: safeW * 0.22, y: baseY },
      { x: safeW * 0.40, y: baseY - visibleH * 0.03 },
      { x: safeW * 0.60, y: baseY - visibleH * 0.03 },
      { x: safeW * 0.78, y: baseY },
    ];
  }, [stageSize.w, stageSize.h, navTotalHeight]);

  const safeW = Math.max(1, stageSize.w);
  const safeH = Math.max(1, stageSize.h);

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

  return (
    <div ref={rootRef} style={rootStyle}>
      {/* Background layer */}
      <div style={bgStyle} />

      {/* Pixi overlay: fireflies + squad */}
      <Stage
        width={safeW}
        height={safeH}
        options={{ backgroundAlpha: 0, antialias: true }}
        style={stageStyle}
      >
        <FirefliesLayer width={safeW} height={safeH} count={18} />

        <Container sortableChildren>
          {squad.map((id, i) => {
            const h = heroMap.get(id);
            const p = squadPositions[i];
            if (!h || !p) return null;

            const idle = h.sprites.idle;

            // left/right (0 and 3) → zIndex=2
            // middle ones (1 and 2) → zIndex=1
            const z = (i === 0 || i === 3) ? 2 : 1;

            return (
              <HeroIdleSprite
                key={id}
                src={idle.src}
                frames={idle.frames}
                frameSize={idle.frameSize}
                columns={idle.columns}
                x={p.x + (idle.offset?.x ?? 0)}
                y={p.y + (idle.offset?.y ?? 0)}
                scale={idle.scale ?? 1}
                speed={idle.speed ?? 0.28}
                zIndex={z}
              />
            );
          })}
        </Container>
      </Stage>

      {/* Bottom navigation menu */}
      <MainNavBar
        activeTab="button1"
        onOpenSummon={onOpenSummon}
        onOpenHeroes={onOpenHeroes}
        height={bottomNavHeight}
      />
    </div>
  );
};

export default MainPage;
