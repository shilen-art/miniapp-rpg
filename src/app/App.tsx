import React from 'react';
import { useWindowSize } from '@/shared/lib/useWindowSize';
import GameStage from '@/game/scenes/GameStage';
import { useTelegramWebApp } from '@/telegram';

const App: React.FC = () => {
  const { width, height } = useWindowSize();
  const { user } = useTelegramWebApp();

  const stageWidth = Math.min(width, 540);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        backgroundColor: '#050712',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {stageWidth > 0 && height > 0 && (
        <GameStage width={stageWidth} height={height} />
      )}

      {user && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            padding: '6px 10px',
            borderRadius: 8,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#ffffff',
            fontSize: 12,
            maxWidth: '80%',
            pointerEvents: 'none',
          }}
        >
          {`Hi, ${user.first_name}${user.username ? ` (@${user.username})` : ''}`}
        </div>
      )}
    </div>
  );
};

export default App;
