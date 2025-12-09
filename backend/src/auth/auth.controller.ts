import { Controller, Post, Body } from '@nestjs/common';
import { AuthService, TelegramAuthResponse } from './auth.service';
import { TelegramAuthDto } from './dto/telegram-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  async authenticateTelegram(
    @Body() dto: TelegramAuthDto,
  ): Promise<TelegramAuthResponse> {
    return this.authService.authenticateTelegram(dto.initData);
  }
}

