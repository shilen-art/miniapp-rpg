// src/game/scenes/SummonPage/SummonPage.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGameStore } from '@/game/state';
import type { CardRevealResult } from '@/game/progression/recruitment';
import { useTelegramWebApp } from '@/telegram';

type Props = {
  onBack: () => void; // возвращает на главную
};

const SummonPage: React.FC<Props> = ({ onBack }) => {
  const { t } = useTranslation();
  const { contentSafeAreaInset } = useTelegramWebApp();
  const cards = useGameStore((s) => s.cards);
  const openCard = useGameStore((s) => s.openCard);
  const [lastResults, setLastResults] = useState<CardRevealResult[]>([]);

  const handleOpenOne = () => {
    const result = openCard();
    if (result) setLastResults([result]);
  };

  const handleOpenTen = () => {
    if (cards < 10) return;
    const results: CardRevealResult[] = [];
    for (let i = 0; i < 10; i++) {
      const r = openCard();
      if (r) results.push(r);
    }
    if (results.length) setLastResults(results);
  };

  const bottomBarHeight = 96;
  const extraSafeBottom = contentSafeAreaInset?.bottom ?? 0;
  const extraSafeTop = contentSafeAreaInset?.top ?? 0;

  const rootStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#0b0d16',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    // резерв под нижний бар
    padding: `calc(20px + ${extraSafeTop}px) 20px calc(20px + ${bottomBarHeight}px + ${extraSafeBottom}px + 16px)`,
    boxSizing: 'border-box',
  };

  const headerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 12 + extraSafeTop,
    left: 12,
    right: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    zIndex: 1,
  };

  const bottomBarStyle: React.CSSProperties = {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16 + extraSafeBottom,
    height: bottomBarHeight,
    background: 'rgba(20,20,20,0.9)',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    padding: 12,
    zIndex: 2,
    boxSizing: 'border-box',
  };

  const backBtnStyle: React.CSSProperties = {
    width: 52,
    height: 52,
    borderRadius: '50%',
    border: '3px solid #111',
    background: '#FFF',
    display: 'grid',
    placeItems: 'center',
    fontSize: 22,
    cursor: 'pointer',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: 12,
    border: 'none',
    background: '#3498dc',
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    minWidth: 150,
  };

  const buttonDisabledStyle: React.CSSProperties = {
    ...buttonStyle,
    background: '#666',
    cursor: 'not-allowed',
    opacity: 0.5,
  };

  const resultStyle: React.CSSProperties = {
    marginTop: 20,
    padding: 16,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 400,
  };

  return (
    <div style={rootStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <button
          onClick={onBack}
          style={{
            height: 36,
            padding: '0 12px',
            borderRadius: 10,
            border: 'none',
            background: '#222',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {t('heroes.back')}
        </button>
        <div style={{ color: '#fff', fontWeight: 700 }}>
          {t('summon.title', 'Summon')}
        </div>
      </div>

      {/* Cards count */}
      <div style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>
        🃏 {t('resources.cards', 'Cards')}: {cards}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <button
          onClick={handleOpenOne}
          disabled={cards <= 0}
          style={cards <= 0 ? buttonDisabledStyle : buttonStyle}
        >
          Open 1 Card
        </button>
        {cards >= 10 && (
          <button onClick={handleOpenTen} style={buttonStyle}>
            Open 10 Cards
          </button>
        )}
      </div>

      {/* Result */}
      {lastResults.length > 0 && (
        <div style={resultStyle}>
          {lastResults.map((r, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              {r.kind === 'hero' ? (
                <>🎉 <strong>Hero obtained:</strong> {r.heroId}</>
              ) : (
                <>📦 <strong>Parts obtained:</strong> {r.amount}x {r.heroId}</>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bottom bar with only back button */}
      <div style={bottomBarStyle}>
        <button onClick={onBack} style={backBtnStyle} aria-label="back">
          ←
        </button>
      </div>
    </div>
  );
};

export default SummonPage;
