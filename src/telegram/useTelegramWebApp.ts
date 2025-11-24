import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface SafeAreaInset {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    [key: string]: unknown;
  };

  // state
  isExpanded?: boolean;
  isFullscreen?: boolean;

  // layout / UI
  expand?: () => void;
  requestFullscreen?: () => void;
  exitFullscreen?: () => void;
  disableVerticalSwipes?: () => void;
  enableVerticalSwipes?: () => void;
  lockOrientation?: () => void;
  unlockOrientation?: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;

  // lifecycle
  ready?: () => void;

  // events
  onEvent?: (eventType: string, handler: (...args: any[]) => void) => void;
  offEvent?: (eventType: string, handler: (...args: any[]) => void) => void;

  safeAreaInset?: SafeAreaInset;
  contentSafeAreaInset?: SafeAreaInset;
}

interface UseTelegramWebAppResult {
  webApp: TelegramWebApp | null;
  user: TelegramUser | null;
  isReady: boolean;
  error: Error | null;
  safeAreaInset: SafeAreaInset | null;
  contentSafeAreaInset: SafeAreaInset | null;
}

/**
 * Main hook for working with Telegram Mini App.
 * - Initializes WebApp
 * - Expands to full height and requests fullscreen
 * - Disables vertical swipes
 * - Locks current orientation
 * - Sets header/background colors matching the game
 * - Exposes WebApp instance and current user
 * - Listens to safe area / viewport changes
 */
export function useTelegramWebApp(): UseTelegramWebAppResult {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [safeAreaInset, setSafeAreaInset] = useState<SafeAreaInset | null>(null);
  const [contentSafeAreaInset, setContentSafeAreaInset] = useState<SafeAreaInset | null>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      setWebApp(null);
      setUser(null);
      setSafeAreaInset(null);
      setContentSafeAreaInset(null);
      setIsReady(true);
      return;
    }

    try {
      tg.expand?.();
      tg.requestFullscreen?.();
      tg.disableVerticalSwipes?.();
      tg.lockOrientation?.();

      // set Telegram Mini App colors to yellow for visual check
      tg.setHeaderColor?.('#ffff00');
      tg.setBackgroundColor?.('#ffff00');

      tg.ready?.();

      setWebApp(tg);

      const readInsets = () => {
        setSafeAreaInset(tg.safeAreaInset ?? null);
        setContentSafeAreaInset(tg.contentSafeAreaInset ?? null);
      };

      // initial read (before/after fullscreen might still be zero, but ok)
      readInsets();

      const handleSafeAreaChanged = () => readInsets();
      const handleViewportChanged = () => readInsets();

      // TG can update insets after expand/fullscreen → listen
      tg.onEvent?.('safeAreaChanged', handleSafeAreaChanged);
      tg.onEvent?.('viewportChanged', handleViewportChanged);

      setUser(tg.initDataUnsafe?.user ?? null);
      setIsReady(true);

      return () => {
        tg.offEvent?.('safeAreaChanged', handleSafeAreaChanged);
        tg.offEvent?.('viewportChanged', handleViewportChanged);
      };
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      console.error('Telegram WebApp init error', err);
      setError(err);
      setIsReady(true);
    }
  }, []);

  return { webApp, user, isReady, error, safeAreaInset, contentSafeAreaInset };
}
