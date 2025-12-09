import * as crypto from 'crypto';

export interface TelegramUser {
  id: string;
  username?: string;
  first_name: string;
  last_name?: string;
  language_code?: string;
}

interface ParsedInitData {
  user: TelegramUser;
  hash: string;
  authDate: number;
}

export function parseInitData(initData: string): ParsedInitData {
  const params = new URLSearchParams(initData);

  const hash = params.get('hash');
  if (!hash) throw new Error('Hash missing in initData');

  params.delete('hash');

  // Telegram sometimes double-encodes user JSON
  let userJson = params.get('user');
  if (!userJson) throw new Error('User not found in initData');

  try {
    userJson = decodeURIComponent(userJson);
    // try double decode
    if (userJson.includes('%7B') || userJson.includes('%22')) {
      userJson = decodeURIComponent(userJson);
    }
  } catch {}

  const user: TelegramUser = JSON.parse(userJson);

  const authDateStr = params.get('auth_date');
  const authDate = authDateStr ? parseInt(authDateStr, 10) : 0;

  return { user, hash, authDate };
}

export function verifyTelegramSignature(
  initData: string,
  botToken: string,
): boolean {
  const params = new URLSearchParams(initData);

  const hash = params.get('hash');
  if (!hash) return false;

  params.delete('hash');

  // remove optional fields not used in signature
  params.delete('tgWebAppData');
  params.delete('tgWebAppVersion');
  params.delete('tgWebAppPlatform');

  const sorted = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const secretKey = crypto
    .createHash('sha256')
    .update(botToken)
    .digest();

  const checkString = crypto
    .createHmac('sha256', secretKey)
    .update(sorted)
    .digest('hex');

  return checkString.toLowerCase() === hash.toLowerCase();
}
