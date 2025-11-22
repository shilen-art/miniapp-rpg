import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingPage from '@/game/scenes/LoadingPage/LoadingPage';
import MainPage from '@/game/scenes/MainPage/MainPage';
import i18n, { detectLanguageFromTelegram } from '@/shared/i18n';
import { useTelegramWebApp } from '@/telegram';

const App: React.FC = () => {
  const { user, contentSafeAreaInset } = useTelegramWebApp();
  const { t } = useTranslation();

  const inset = contentSafeAreaInset ?? { top: 0, right: 0, bottom: 0, left: 0 };

  const [activeScene, setActiveScene] = useState<'loading' | 'mainPage'>('loading');

  useEffect(() => {
    if (!user) return;

    const lang = detectLanguageFromTelegram(user.language_code);
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang).catch(() => {
        // ignore language change errors
      });
    }
  }, [user]);


  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#000',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '780px',
          height: '100%',
          position: 'relative',
          margin: '0 auto',
          overflow: 'hidden',
          backgroundColor: '#050712',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
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
        {activeScene === 'loading' && (
          <LoadingPage onLoaded={() => setActiveScene('mainPage')} />
        )}

        {activeScene === 'mainPage' && (
          <MainPage />
        )}

        {/* Telegram user overlay */}
        {user && (
          <div
            style={{
              position: 'absolute',
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
      </div>
    </div>
  );
};

export default App;
