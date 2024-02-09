
import { Controller, Post, Body, ValidationPipe, Get, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('verify')
  async verifyUser(@Headers('authorization') authorization: string) {
    try {
      await this.authService.validateTokenAndFindUser(authorization);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  } 

  @Post('register')
  async register(@Body(ValidationPipe) {username, password}: LoginDto): Promise<{ token: string, username: string }> {
    const res = await this.authService.registerUser(username, password);
    return res;
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ token: string, username: string }> {
    const token = await this.authService.login(loginDto);
    return token;
  }

  @Post('logout')
  async logout(): Promise<{ message: string }> {
    return { message: 'Logout successful' };
  }
}
