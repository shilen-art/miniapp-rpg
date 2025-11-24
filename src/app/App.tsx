import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HEROES_REGISTRY, HeroDef, HeroId } from '@/game/heroes/registry';
import HeroDetailsPage from '@/game/scenes/HeroDetailsPage';
import HeroesPage from '@/game/scenes/HeroesPage/HeroesPage';
import LoadingPage from '@/game/scenes/LoadingPage/LoadingPage';
import MainPage from '@/game/scenes/MainPage/MainPage';
import SummonPage from '@/game/scenes/SummonPage';
import { useGameStore } from '@/game/state';
import TopResourcesBar from '@/game/ui/TopResourcesBar';
import i18n, { detectLanguageFromTelegram } from '@/shared/i18n';
import { useTelegramWebApp } from '@/telegram';

const App: React.FC = () => {
  const { user, safeAreaInset, contentSafeAreaInset } = useTelegramWebApp();
  const { t } = useTranslation();

  // FIX: приоритет contentSafeAreaInset (он реально защищает от TG-хедера/кнопок),
  // safeAreaInset как fallback
  const inset = {
    top: contentSafeAreaInset?.top ?? safeAreaInset?.top ?? 0,
    right: contentSafeAreaInset?.right ?? safeAreaInset?.right ?? 0,
    bottom: contentSafeAreaInset?.bottom ?? safeAreaInset?.bottom ?? 0,
    left: contentSafeAreaInset?.left ?? safeAreaInset?.left ?? 0,
  };

  const [activeScene, setActiveScene] = useState<
    'loading' | 'mainPage' | 'heroesPage' | 'heroDetailsPage' | 'summonPage'
  >('loading');
  const [selectedHeroId, setSelectedHeroId] = useState<HeroId | null>(null);
  const [previousScene, setPreviousScene] = useState<'mainPage' | 'heroesPage' | null>(null);
  const [initialTab, setInitialTab] = useState<'character' | 'inventory' | undefined>(undefined);

  const squad = useGameStore((s) => s.squad);
  const setSquad = useGameStore((s) => s.setSquad);

  const heroes = useMemo<HeroDef[]>(() => [...HEROES_REGISTRY], []);

  useEffect(() => {
    if (!user) return;
    const lang = detectLanguageFromTelegram(user.language_code);
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang).catch(() => {});
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
      {/* общий контейнер */}
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
          flexDirection: 'column',
          boxSizing: 'border-box',
          paddingTop: inset.top,
          paddingRight: inset.right,
          paddingBottom: inset.bottom,
          paddingLeft: inset.left,
        }}
      >
        {/* Глобальная верхняя панель, обычный блок */}
        <div style={{ padding: 8, boxSizing: 'border-box', flexShrink: 0 }}>
          <TopResourcesBar showCards={activeScene === 'summonPage'} />
        </div>

        {/* Сцены */}
        <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
          {/* build label */}
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              fontSize: 10,
              color: '#ff5555',
              zIndex: 9999,
              pointerEvents: 'none',
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
              onOpenSummon={() => setActiveScene('summonPage')}
            />
          )}

          {activeScene === 'summonPage' && (
            <SummonPage onBack={() => setActiveScene('mainPage')} />
          )}

          {activeScene === 'heroesPage' && (
            <HeroesPage
              heroes={heroes}
              squad={squad}
              onBack={() => setActiveScene('mainPage')}
              onChangeSquad={setSquad}
              onOpenHeroDetails={(heroId: HeroId, tab?: 'character' | 'inventory') => {
                setSelectedHeroId(heroId);
                setPreviousScene('heroesPage');
                setInitialTab(tab);
                setActiveScene('heroDetailsPage');
              }}
            />
          )}

          {activeScene === 'heroDetailsPage' && selectedHeroId && (
            <HeroDetailsPage
              heroId={selectedHeroId}
              onBack={() => {
                if (previousScene) {
                  setActiveScene(previousScene);
                  setPreviousScene(null);
                } else {
                  setActiveScene('mainPage');
                }
                setInitialTab(undefined);
              }}
              onOpenHeroes={() => {
                setPreviousScene('heroesPage');
                setActiveScene('heroesPage');
              }}
              initialTab={initialTab}
            />
          )}

          {/* Telegram user overlay */}
          {user && (
            <div
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
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
    </div>
  );
};

export default App;
