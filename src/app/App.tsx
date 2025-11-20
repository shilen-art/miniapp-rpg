import React from 'react';

import GameStage from '@/game/scenes/GameStage';
import { useWindowSize } from '@/shared/lib/useWindowSize';
import { useTelegramWebApp } from '@/telegram';
import { useGameStore } from '@/game/state/gameStore';

const App: React.FC = () => {
  const { width, height } = useWindowSize();
  const { user } = useTelegramWebApp();

  const activeScene = useGameStore(state => state.activeScene);
  const resources = useGameStore(state => state.resources);
  const setActiveScene = useGameStore(state => state.setActiveScene);
  const addResource = useGameStore(state => state.addResource);

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

      {/* Telegram user overlay */}
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
            maxWidth: '60%',
            pointerEvents: 'none',
          }}
        >
          {`Hi, ${user.first_name}${
            user.username ? ` (@${user.username})` : ''
          }`}
        </div>
      )}

      {/* Debug-панель состояния игры (временно, для нас) */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          padding: '8px 10px',
          borderRadius: 8,
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: '#ffffff',
          fontSize: 11,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <div>Scene: {activeScene}</div>
        <div>
          Wood: {resources.wood} | Stone: {resources.stone}
        </div>
        <div>
          Food: {resources.food} | Rubies: {resources.rubies} | Crystals:{' '}
          {resources.crystals}
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          <button
            type="button"
            style={{
              fontSize: 10,
              padding: '2px 6px',
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setActiveScene('settlement')}
          >
            To settlement
          </button>
          <button
            type="button"
            style={{
              fontSize: 10,
              padding: '2px 6px',
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => addResource('wood', 10)}
          >
            +10 wood
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
