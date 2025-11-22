import React, { useMemo, useRef, useState } from 'react';
import { Container, Graphics, useTick } from '@pixi/react';

type Firefly = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  alpha: number;
  vy: number;
  vx: number;
  amp: number;
  freq: number;
  phase: number;
  lifeMs: number;
  ageMs: number;
};

type Props = {
  width: number;
  height: number;
  count?: number;
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function spawn(width: number, height: number): Firefly {
  const lifeMs = rand(7000, 25000); // дольше живут
  const baseAlpha = rand(0.25, 1.7);

  return {
    x: rand(0, width),
    y: rand(height * 0.4, height), // нижняя половина
    r: rand(2.2, 4.2),             // меньше размер
    baseAlpha,
    alpha: baseAlpha,
    vy: rand(14, 36),              // медленнее вверх => долетают выше
    vx: rand(-5, 5),
    amp: rand(2, 15),              // меньше “виляния”, не похоже на пузыри
    freq: rand(0.4, 1.2),
    phase: rand(0, Math.PI * 2),
    lifeMs,
    ageMs: 0,
  };
}

export default function FirefliesLayer({ width, height, count = 18 }: Props) {
  const [, forceUpdate] = useState(0);
  const tRef = useRef(0);

  const firefliesRef = useRef<Firefly[]>(
    Array.from({ length: count }, () => spawn(width, height))
  );

  // если размеры/количество поменялись — пересоздаём
  useMemo(() => {
    firefliesRef.current = Array.from({ length: count }, () => spawn(width, height));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, count]);

  useTick((delta) => {
    const dt = delta / 60; // секунды
    tRef.current += dt;

    const arr = firefliesRef.current;
    for (let i = 0; i < arr.length; i++) {
      const f = arr[i];
      f.ageMs += dt * 1000;

      const progress = f.ageMs / f.lifeMs; // 0..1

      // плавное угасание на последних 25% жизни
      const fadeStart = 0.75;
      let fadeMult = 1;
      if (progress > fadeStart) {
        const p = (progress - fadeStart) / (1 - fadeStart); // 0..1
        fadeMult = Math.max(0, 1 - p); // линейно к 0
      }
      f.alpha = f.baseAlpha * fadeMult;

      const drift = Math.sin(tRef.current * f.freq + f.phase) * f.amp;

      f.y -= f.vy * dt;
      f.x += f.vx * dt + drift * dt;

      // респавн только когда полностью “угас” или улетел далеко вверх
      if (f.y < -30 || progress >= 1) {
        arr[i] = spawn(width, height);
      }

      // wrap по X
      if (f.x < -20) f.x = width + 20;
      if (f.x > width + 20) f.x = -20;
    }

    forceUpdate((v) => (v + 1) % 100000);
  });

  return (
    <Container>
      {firefliesRef.current.map((f, idx) => (
        <Graphics
          key={idx}
          x={f.x}
          y={f.y}
          alpha={f.alpha}
          draw={(g) => {
            g.clear();

            // тёплый желтоватый свет
            g.beginFill(0xfffddd, 1);
            g.drawCircle(0, 0, f.r);
            g.endFill();

            // небольшой ореол (тоже жёлтый, слабый)
            g.beginFill(0xfffddd, 0.12);
            g.drawCircle(0, 0, f.r * 1.8);
            g.endFill();
          }}
        />
      ))}
    </Container>
  );
}
