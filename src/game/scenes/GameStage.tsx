import { Stage, Graphics } from '@pixi/react';
import type { Graphics as PixiGraphics } from 'pixi.js';
import React from 'react';

interface GameStageProps {
  width: number;
  height: number;
}

const GameStage: React.FC<GameStageProps> = ({ width, height }) => {
  const drawPlatform = (g: PixiGraphics) => {
    const platformWidth = width * 0.6;
    const platformHeight = height * 0.15;
    const platformX = (width - platformWidth) / 2;
    const platformY = height * 0.7;

    g.clear();
    g.beginFill(0x22293b);
    g.drawRect(platformX, platformY, platformWidth, platformHeight);
    g.endFill();
  };

  return (
    <Stage
      width={width}
      height={height}
      options={{
        backgroundColor: 0xffffff,
      }}
    >
      <Graphics draw={drawPlatform} />
    </Stage>
  );
};

export default GameStage;
