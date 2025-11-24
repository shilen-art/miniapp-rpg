import React from 'react';
import { useTranslation } from 'react-i18next';

import { useTelegramWebApp } from '@/telegram';

export type MainNavTab = 'summon' | 'heroes' | 'button1' | 'button3' | 'button4' | 'button5';

type Props = {
  activeTab: MainNavTab;
  onOpenSummon?: () => void;
  onOpenHeroes?: () => void;
  onOpenButton1?: () => void;
  onOpenButton3?: () => void;
  onOpenButton4?: () => void;
  onOpenButton5?: () => void;
  height?: number; // default 96
};

const MainNavBar: React.FC<Props> = ({
  activeTab,
  onOpenSummon,
  onOpenHeroes,
  onOpenButton1,
  onOpenButton3,
  onOpenButton4,
  onOpenButton5,
  height = 96,
}) => {
  const { t } = useTranslation();
  const { contentSafeAreaInset } = useTelegramWebApp();

  const extraSafeBottom = contentSafeAreaInset?.bottom ?? 0;

  const TabButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick?: () => void;
  }> = ({ label, isActive, onClick }) => {
    const isDisabled = !onClick;
    const opacity = isActive ? 1 : isDisabled ? 0.5 : 1;

    return (
      <button
        type="button"
        onClick={onClick}
        disabled={isDisabled}
        style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
          background: 'transparent',
          border: 'none',
          cursor: isDisabled ? 'default' : 'pointer',
          opacity,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            backgroundColor: '#666',
            borderRadius: 10,
          }}
        />
        <span>{label}</span>
      </button>
    );
  };

  /**
   * Button 0 logic:
   * - If we're currently on Summon page (activeTab === 'summon'),
   *   button 0 MUST be Summon (highlighted), even if onOpenSummon is undefined.
   * - Otherwise, button 0 is Summon only if onOpenSummon exists,
   *   else it's button1.
   */
  const button0Tab: MainNavTab =
    activeTab === 'summon'
      ? 'summon'
      : onOpenSummon
      ? 'summon'
      : 'button1';

  const button0Active = activeTab === button0Tab;

  const button0Label =
    button0Tab === 'summon'
      ? t('summon.title', 'Summon')
      : t('main.nav.button1');

  const button0Callback =
    button0Tab === 'summon' ? onOpenSummon : onOpenButton1;

  const button0OnClick = button0Active ? undefined : button0Callback;

  return (
    <div
      style={{
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 16 + extraSafeBottom,
        height,
        background: 'rgba(20,20,20,0.9)',
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        gap: 8,
        zIndex: 2,
        boxSizing: 'border-box',
      }}
    >
      <TabButton label={button0Label} isActive={button0Active} onClick={button0OnClick} />

      <TabButton
        label={t('main.nav.heroes')}
        isActive={activeTab === 'heroes'}
        onClick={activeTab === 'heroes' ? undefined : onOpenHeroes}
      />

      <TabButton
        label={t('main.nav.button3')}
        isActive={activeTab === 'button3'}
        onClick={activeTab === 'button3' ? undefined : onOpenButton3}
      />

      <TabButton
        label={t('main.nav.button4')}
        isActive={activeTab === 'button4'}
        onClick={activeTab === 'button4' ? undefined : onOpenButton4}
      />

      <TabButton
        label={t('main.nav.button5')}
        isActive={activeTab === 'button5'}
        onClick={activeTab === 'button5' ? undefined : onOpenButton5}
      />
    </div>
  );
};

export default MainNavBar;
