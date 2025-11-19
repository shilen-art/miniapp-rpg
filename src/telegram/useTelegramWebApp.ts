import { useEffect, useState } from 'react';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramWebApp {
  initDataUnsafe?: {
    user?: TelegramUser;
    [key: string]: unknown;
  };
  ready: () => void;
  expand: () => void;
  colorScheme?: 'light' | 'dark';
  themeParams?: Record<string, unknown>;
}

interface UseTelegramWebAppResult {
  webApp: TelegramWebApp | null;
  user: TelegramUser | null;
}

export const useTelegramWebApp = (): UseTelegramWebAppResult => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const tg = (window as any).Telegram?.WebApp as TelegramWebApp | undefined;

    if (!tg) {
      return;
    }

    try {
      tg.ready();
      tg.expand();
    } catch {
      // ignore Telegram errors
    }

    setWebApp(tg);

    const tgUser = tg.initDataUnsafe?.user ?? null;
    setUser(tgUser ?? null);
  }, []);

  return { webApp, user };
};
