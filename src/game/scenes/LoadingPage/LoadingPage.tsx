import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LoadingPageProps {
  onLoaded: () => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onLoaded }) => {
  const { t } = useTranslation();

  useEffect(() => {
    let cancelled = false;

    async function preloadMainPage() {
      try {
        // Tie loading duration to actual MainPage chunk load.
        // When MainPage grows and imports assets, this await will cover that time.
        await import('../MainPage/MainPage');

        if (!cancelled) onLoaded();
      } catch (e) {
        // Even if preload fails, don't freeze on loading forever
        if (!cancelled) onLoaded();
      }
    }

    preloadMainPage();

    return () => {
      cancelled = true;
    };
  }, [onLoaded]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffff00', // temporary yellow BG
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bottom loading row */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          fontSize: 18,
          fontWeight: 600,
          color: '#000',
        }}
      >
        <span>{t('loading.title')}</span>

        {/* Simple CSS spinner */}
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            border: '2px solid rgba(0,0,0,0.25)',
            borderTopColor: '#000',
            animation: 'spin 0.9s linear infinite',
            display: 'inline-block',
          }}
        />
      </div>

      {/* Keyframes for spinner */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingPage;

