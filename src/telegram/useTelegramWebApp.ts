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

  // events (keep minimal typing, we don't use them heavily yet)
  onEvent?: (eventType: string, handler: (...args: any[]) => void) => void;
  offEvent?: (eventType: string, handler: (...args: any[]) => void) => void;
}

interface UseTelegramWebAppResult {
  webApp: TelegramWebApp | null;
  user: TelegramUser | null;
  isReady: boolean;
  error: Error | null;
}

/**
 * Main hook for working with Telegram Mini App.
 * - Initializes WebApp
 * - Expands to full height and requests fullscreen
 * - Disables vertical swipes
 * - Locks current orientation
 * - Sets header/background colors matching the game
 * - Exposes WebApp instance and current user
 */
export function useTelegramWebApp(): UseTelegramWebAppResult {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      // not in Telegram environment
      setWebApp(null);
      setUser(null);
      setIsReady(true);
      return;
    }

    try {
      // Maximize height inside Telegram
      tg.expand?.();

      // Request true fullscreen (Bot API 8.0+)
      tg.requestFullscreen?.();

      // Disable swipe-down closing / gestures
      tg.disableVerticalSwipes?.();

      // Lock current orientation (portrait when user opened the app)
      tg.lockOrientation?.();

      // set Telegram Mini App colors to yellow for visual check
      tg.setHeaderColor?.('#ffff00');
      tg.setBackgroundColor?.('#ffff00');

      // Signal to Telegram that the app UI is ready
      tg.ready?.();

      // Save WebApp instance and user
      setWebApp(tg);
      setUser(tg.initDataUnsafe?.user ?? null);
      setIsReady(true);
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      console.error('Telegram WebApp init error', err);
      setError(err);
      setIsReady(true);
    }
  }, []);

  return { webApp, user, isReady, error };
}
