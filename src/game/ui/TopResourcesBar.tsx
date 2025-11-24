import React from 'react';
import { useTranslation } from 'react-i18next';

import { useGameStore } from '@/game/state';
import { useTelegramWebApp } from '@/telegram';

const TopResourcesBar: React.FC<{ showCards?: boolean }> = ({ showCards }) => {
  const resources = useGameStore((s) => s.resources);
  const cards = useGameStore((s) => s.cards);
  const { t } = useTranslation();
  const { webApp } = useTelegramWebApp();

  // Отступ сверху только для Telegram Mini App
  const isTelegram = !!webApp;
  const topOffset = isTelegram ? 50 : 8;

  const rootStyle: React.CSSProperties = {
    position: 'absolute',
    top: topOffset,
    left: 8,
    right: 8,
    zIndex: 50,
    display: 'flex',
    gap: 8,
    padding: 6,
    borderRadius: 12,
    background: 'rgba(0,0,0,0.45)',
    pointerEvents: 'none',
    boxSizing: 'border-box',
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    padding: '4px 8px',
    fontSize: 12,
    fontWeight: 700,
    color: '#fff',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  };

  return (
    <div style={rootStyle}>
      <div style={itemStyle}>
        🍖 {t('resources.meat')}: {resources.meat}
      </div>
      <div style={itemStyle}>
        ❤️ {t('resources.rubies')}: {resources.rubies}
      </div>
      <div style={itemStyle}>
        💠 {t('resources.crystals')}: {resources.crystals}
      </div>

      {showCards && (
        <div style={itemStyle}>
          🃏 {t('resources.cards', 'Cards')}: {cards}
        </div>
      )}
    </div>
  );
};

export default TopResourcesBar;
