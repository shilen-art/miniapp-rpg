import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { PrismaService } from '../prisma/prisma.service';
  import {
    parseInitData,
    verifyTelegramSignature,
  } from './telegram-verify.util';
  
  export interface TelegramAuthResponse {
    accessToken: string;
    user: {
      id: number;
      telegramId: string;
      username: string | null;
      firstName: string;
      lastName: string | null;
      locale: string | null;
    };
  }
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly prisma: PrismaService,
      private readonly jwtService: JwtService,
    ) {}
  
    /**
     * Основная авторизация через Telegram Mini App initData
     */
    async authenticateTelegram(initData: string): Promise<TelegramAuthResponse> {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
  
      if (!botToken) {
        throw new BadRequestException('TELEGRAM_BOT_TOKEN is not configured');
      }
  
      if (!initData || initData.trim().length < 10) {
        throw new BadRequestException('initData is missing or invalid');
      }
  
      // ---------------------------------------
      // 1. Проверяем подпись Telegram (HMAC)
      // ---------------------------------------
      const isValid = verifyTelegramSignature(initData, botToken);
      if (!isValid) {
        throw new UnauthorizedException('Invalid Telegram signature');
      }
  
      // ---------------------------------------
      // 2. Парсим данные
      // ---------------------------------------
      let parsed;
      try {
        parsed = parseInitData(initData);
      } catch (e) {
        console.error('❌ Failed to parse initData:', e);
        throw new BadRequestException('initData parse failed');
      }
  
      const { user, authDate } = parsed;
  
      // ---------------------------------------
      // 3. Проверяем срок жизни initData — 24 часа
      // ---------------------------------------
      const now = Math.floor(Date.now() / 1000);
      if (now - authDate > 86400) {
        throw new UnauthorizedException('initData is too old (expired)');
      }
  
      // ---------------------------------------
      // 4. Преобразуем Telegram ID → BigInt
      // ---------------------------------------
      const telegramId = BigInt(user.id);
  
      // ---------------------------------------
      // 5. Сохраняем пользователя в базе
      // ---------------------------------------
      let dbUser;
      try {
        dbUser = await this.prisma.user.upsert({
          where: { telegramId },
          update: {
            username: user.username || null,
            firstName: user.first_name || '',
            lastName: user.last_name || null,
            locale: user.language_code || null,
            // lastSeenAt обновится через @updatedAt
          },
          create: {
            telegramId,
            username: user.username || null,
            firstName: user.first_name || '',
            lastName: user.last_name || null,
            locale: user.language_code || null,
          },
        });
      } catch (e) {
        console.error('❌ Database error while upserting user:', e);
        throw new InternalServerErrorException('Failed to save user data');
      }
  
      // ---------------------------------------
      // 6. Генерируем безопасный JWT
      // ---------------------------------------
      const payload = {
        userId: dbUser.id,
        telegramId: dbUser.telegramId.toString(),
      };
  
      let accessToken: string;
  
      try {
        accessToken = this.jwtService.sign(payload);
      } catch (e) {
        console.error('❌ JWT signing failed:', e);
        throw new InternalServerErrorException('Cannot generate token');
      }
  
      // ---------------------------------------
      // 7. Формируем ответ
      // ---------------------------------------
  
      return {
        accessToken,
        user: {
          id: dbUser.id,
          telegramId: dbUser.telegramId.toString(),
          username: dbUser.username,
          firstName: dbUser.firstName,
          lastName: dbUser.lastName,
          locale: dbUser.locale,
        },
      };
    }
  
    /**
     * Проверка user при использовании JWT guard
     */
    async validateUser(payload: { userId: number; telegramId: string }) {
      const telegramId = BigInt(payload.telegramId);
  
      const user = await this.prisma.user.findUnique({
        where: { telegramId },
      });
  
      if (!user || user.id !== payload.userId) {
        return null;
      }
  
      return user;
    }
  }
  