import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import GameStage from '@/game/scenes/GameStage';
import { useGameStore } from '@/game/state/gameStore';
import { useWindowSize } from '@/shared/lib/useWindowSize';
import i18n, { detectLanguageFromTelegram, type SupportedLang } from '@/shared/i18n';
import { useTelegramWebApp } from '@/telegram';

const App: React.FC = () => {
  const { width, height } = useWindowSize();
  const { user, contentSafeAreaInset } = useTelegramWebApp();
  const { t } = useTranslation();

  const inset = contentSafeAreaInset ?? { top: 0, right: 0, bottom: 0, left: 0 };

  const activeScene = useGameStore(state => state.activeScene);
  const resources = useGameStore(state => state.resources);
  const setActiveScene = useGameStore(state => state.setActiveScene);
  const addResource = useGameStore(state => state.addResource);

  useEffect(() => {
    if (!user) return;

    const lang = detectLanguageFromTelegram(user.language_code);
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang).catch(() => {
        // ignore language change errors
      });
    }
  }, [user]);

  const stageWidth = Math.min(width, 540);

  // safe drawing area inside Telegram content safe area
  const safeHeight = Math.max(height - inset.top - inset.bottom, 0);
  const safeWidth = Math.max(
    Math.min(stageWidth, width - inset.left - inset.right),
    0,
  );

  const changeLang = (lang: SupportedLang) => {
    if (i18n.language === lang) return;
    i18n.changeLanguage(lang).catch(() => {
      // ignore language change errors
    });
  };

  const langButtons: SupportedLang[] = ['ru', 'en', 'uk'];

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
        boxSizing: 'border-box',
        paddingTop: inset.top,
        paddingRight: inset.right,
        paddingBottom: inset.bottom,
        paddingLeft: inset.left,
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          fontSize: 10,
          color: '#ff5555',
          zIndex: 9999,
        }}
      >
        BUILD: TEST-123
      </div>
      {safeWidth > 0 && safeHeight > 0 && (
        <GameStage width={safeWidth} height={safeHeight} />
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
          {t('telegram.hi', {
            name: user.first_name,
            username: user.username ? ` (@${user.username})` : '',
          })}
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
        <div>
          {t('debug.scene')}: {activeScene}
        </div>
        <div>
          {t('debug.resources.wood')}: {resources.wood} | {t('debug.resources.stone')}:{' '}
          {resources.stone}
        </div>
        <div>
          {t('debug.resources.food')}: {resources.food} | {t('debug.resources.rubies')}:{' '}
          {resources.rubies} | {t('debug.resources.crystals')}: {resources.crystals}
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
            {t('debug.toSettlement')}
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
            {t('debug.plus10Wood')}
          </button>
        </div>

        {/* переключатель языков */}
        <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
          {langButtons.map(lang => {
            const isActive = i18n.language === lang;
            return (
              <button
                key={lang}
                type="button"
                style={{
                  fontSize: 10,
                  padding: '2px 6px',
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: isActive ? 700 : 400,
                  opacity: isActive ? 1 : 0.6,
                }}
                onClick={() => changeLang(lang)}
              >
                {lang.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
