import React from 'react';
import { useTranslation } from 'react-i18next';

import { useTelegramWebApp } from '@/telegram';

export type HeroesNavTab = 'character' | 'inventory' | 'heroes';

type Props = {
  activeTab: HeroesNavTab;
  onBack: () => void;
  onOpenCharacter?: () => void;
  onOpenInventory?: () => void;
  onOpenHeroes?: () => void;
  height?: number; // default 72
};

const HeroesNavBar: React.FC<Props> = ({
  activeTab,
  onBack,
  onOpenCharacter,
  onOpenInventory,
  onOpenHeroes,
  height = 72,
}) => {
  const { t } = useTranslation();
  const { contentSafeAreaInset } = useTelegramWebApp();
  const extraSafeBottom = contentSafeAreaInset?.bottom ?? 0;

  const tabBtn = (label: string, key: HeroesNavTab, onClick?: () => void) => {
    const isActive = activeTab === key;
    return (
      <button
        key={key}
        type="button"
        onClick={isActive ? undefined : onClick}
        disabled={!onClick}
        style={{
          height: '100%',
          borderRadius: 12,
          background: 'transparent',
          border: 'none',
          color: isActive ? '#F2C94C' : '#fff',
          fontSize: 12,
          fontWeight: 700,
          cursor: !onClick || isActive ? 'default' : 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          opacity: !onClick ? 0.5 : 1,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            background: isActive
              ? 'rgba(242,201,76,0.25)'
              : 'rgba(255,255,255,0.15)',
          }}
        />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div
      style={{
        height,
        background: 'rgba(20,20,20,0.9)',
        display: 'grid',
        gridTemplateColumns: '64px 1fr 1fr 1fr',
        alignItems: 'center',
        gap: 6,
        padding: '6px 8px',
        boxSizing: 'border-box',
        flexShrink: 0,
        paddingBottom: 6 + extraSafeBottom,
      }}
    >
      <button
        onClick={onBack}
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: '3px solid #111',
          background: '#FFF',
          display: 'grid',
          placeItems: 'center',
          fontSize: 22,
          cursor: 'pointer',
        }}
        aria-label="back"
      >
        ←
      </button>

      {tabBtn(t('nav.character', 'Персонаж'), 'character', onOpenCharacter)}
      {tabBtn(t('nav.inventory', 'Инвентарь'), 'inventory', onOpenInventory)}
      {tabBtn(t('nav.heroes', 'Герои'), 'heroes', onOpenHeroes)}
    </div>
  );
};

export default HeroesNavBar;
