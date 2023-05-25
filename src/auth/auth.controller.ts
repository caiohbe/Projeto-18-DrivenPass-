import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() user: AuthLoginDto) {
    try {
      return this.authService.login(user);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
