import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from "../service/AuthService";
import { LoginDto } from "../dto/LoginDto";

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}