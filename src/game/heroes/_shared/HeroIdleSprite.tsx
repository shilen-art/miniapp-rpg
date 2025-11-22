import { useEffect, useMemo, useState } from 'react';
import { AnimatedSprite } from '@pixi/react';
import * as PIXI from 'pixi.js';

type Props = {
  src: string;
  frames: number;
  frameSize: number;
  columns: number;     // 32
  scale?: number;
  anchor?: number;
  x?: number;
  y?: number;
  speed?: number;
  zIndex?: number;
};

export default function HeroIdleSprite({
  src,
  frames,
  frameSize,
  columns,
  scale = 0.52,
  anchor = 0.5,
  x = 0,
  y = 0,
  speed = 0.28,
  zIndex = 0,
}: Props) {
  const [ready, setReady] = useState(false);
  const [baseTexture, setBaseTexture] = useState<PIXI.BaseTexture | null>(null);

  useEffect(() => {
    const bt = PIXI.BaseTexture.from(src);
    setBaseTexture(bt);

    const onLoaded = () => setReady(true);

    if (bt.valid) {
      setReady(true);
    } else {
      bt.once('loaded', onLoaded);
    }

    return () => {
      bt.off('loaded', onLoaded);
    };
  }, [src]);

  const textures = useMemo(() => {
    if (!baseTexture || !ready) return [];

    const cols = Math.max(1, columns);
    const rows = Math.ceil(frames / cols);

    const out: PIXI.Texture[] = [];
    for (let i = 0; i < frames; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      if (row >= rows) break;

      const rect = new PIXI.Rectangle(
        col * frameSize,
        row * frameSize,
        frameSize,
        frameSize
      );

      out.push(new PIXI.Texture(baseTexture, rect));
    }

    return out;
  }, [baseTexture, ready, frames, frameSize, columns]);

  if (!ready || textures.length === 0) return null;

  return (
    <AnimatedSprite
      textures={textures}
      isPlaying
      animationSpeed={speed}
      loop
      x={x}
      y={y}
      anchor={anchor}
      scale={scale}
      zIndex={zIndex}
    />
  );
}
