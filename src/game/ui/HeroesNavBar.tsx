// src/game/ui/HeroesNavBar.tsx
import React from 'react';

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
  const TabButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick?: () => void;
  }> = ({ label, isActive, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: '100%',
        borderRadius: 12,
        background: 'transparent',
        border: 'none',
        color: isActive ? '#F2C94C' : '#fff',
        fontSize: 12,
        fontWeight: 700,
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        opacity: isActive ? 1 : 0.9,
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

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height,
        background: 'rgba(20,20,20,0.9)',
        display: 'grid',
        gridTemplateColumns: '64px 1fr 1fr 1fr',
        alignItems: 'center',
        gap: 6,
        padding: '6px 8px',
        boxSizing: 'border-box',
        zIndex: 5,
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

      <TabButton
        label="Персонаж"
        isActive={activeTab === 'character'}
        onClick={activeTab === 'character' ? undefined : onOpenCharacter}
      />
      <TabButton
        label="Инвентарь"
        isActive={activeTab === 'inventory'}
        onClick={activeTab === 'inventory' ? undefined : onOpenInventory}
      />
      <TabButton
        label="Герои"
        isActive={activeTab === 'heroes'}
        onClick={activeTab === 'heroes' ? undefined : onOpenHeroes}
      />
    </div>
  );
};

export default HeroesNavBar;
