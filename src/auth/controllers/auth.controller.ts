import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation-pipe';
import { LoginDto, loginSchema } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body(new ZodValidationPipe(loginSchema)) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
