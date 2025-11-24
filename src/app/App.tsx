import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HEROES_REGISTRY, HeroDef, HeroId } from '@/game/heroes/registry';
import HeroDetailsPage from '@/game/scenes/HeroDetailsPage';
import HeroesPage from '@/game/scenes/HeroesPage/HeroesPage';
import LoadingPage from '@/game/scenes/LoadingPage/LoadingPage';
import MainPage from '@/game/scenes/MainPage/MainPage';
import { useGameStore } from '@/game/state';
import i18n, { detectLanguageFromTelegram } from '@/shared/i18n';
import { useTelegramWebApp } from '@/telegram';

const App: React.FC = () => {
  const { user, contentSafeAreaInset } = useTelegramWebApp();
  const { t } = useTranslation();

  const inset = contentSafeAreaInset ?? { top: 0, right: 0, bottom: 0, left: 0 };

  const [activeScene, setActiveScene] = useState<'loading' | 'mainPage' | 'heroesPage' | 'heroDetailsPage'>('loading');
  const [selectedHeroId, setSelectedHeroId] = useState<HeroId | null>(null);

  const squad = useGameStore((s) => s.squad);
  const setSquad = useGameStore((s) => s.setSquad);

  const heroes = useMemo<HeroDef[]>(() => [...HEROES_REGISTRY], []);

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
      {/* общий контейнер с ограничением ширины */}
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
        {/* build label */}
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
          <MainPage
            heroes={heroes}
            squad={squad}
            onOpenHeroes={() => setActiveScene('heroesPage')}
          />
        )}

        {activeScene === 'heroesPage' && (
          <HeroesPage
            heroes={heroes}
            squad={squad}
            onBack={() => setActiveScene('mainPage')}
            onChangeSquad={setSquad}
            onOpenHeroDetails={(heroId) => {
              setSelectedHeroId(heroId);
              setActiveScene('heroDetailsPage');
            }}
          />
        )}

        {activeScene === 'heroDetailsPage' && selectedHeroId && (
          <HeroDetailsPage
            heroId={selectedHeroId}
            onBack={() => setActiveScene('mainPage')}
          />
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
