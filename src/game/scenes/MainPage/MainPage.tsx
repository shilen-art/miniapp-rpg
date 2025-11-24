import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Container, Stage } from '@pixi/react';

import { HeroDef, HeroId } from '@/game/heroes';
import HeroIdleSprite from '@/game/heroes/_shared/HeroIdleSprite';
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
  // eslint-disable-next-line no-undef
  const rootRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
  const { contentSafeAreaInset } = useTelegramWebApp();

  useEffect(() => {
    const update = () => {
      if (!rootRef.current) return;
      const r = rootRef.current.getBoundingClientRect();
      setStageSize({ w: r.width, h: r.height });
    };

    update();

    const RO = window.ResizeObserver;
    // eslint-disable-next-line no-undef
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
  const navTotalHeight = bottomNavHeight + 16 + extraSafeBottom;

  const safeW = Math.max(1, stageSize.w);
  const safeH = Math.max(1, stageSize.h);

  const squadPositions = useMemo(() => {
    const visibleH = safeH - navTotalHeight;
    const baseY = visibleH * 0.7;

    return [
      { x: safeW * 0.22, y: baseY },
      { x: safeW * 0.40, y: baseY - visibleH * 0.03 },
      { x: safeW * 0.60, y: baseY - visibleH * 0.03 },
      { x: safeW * 0.78, y: baseY },
    ];
  }, [safeW, safeH, navTotalHeight]);

  return (
    <div
      ref={rootRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${mainBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <Stage
        width={safeW}
        height={safeH}
        options={{ backgroundAlpha: 0, antialias: true }}
        style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
      >
        <FirefliesLayer width={safeW} height={safeH} count={18} />

        <Container sortableChildren>
          {squad.map((id, i) => {
            const h = heroMap.get(id);
            const p = squadPositions[i];
            if (!h || !p) return null;

            const idle = h.sprites.idle;
            const z = i === 0 || i === 3 ? 2 : 1;

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
