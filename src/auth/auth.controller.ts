import { Controller, Get, Post, Body, UseGuards, Req, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service'; 
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}  // Inyectar AuthService

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user); 
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    console.log("dadasdas")
    return this.authService.register(createUserDto); 
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req): any {
    return req.user;
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req): Promise<void> {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() req): any {
    return req.user;
  }

  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  async appleAuth(@Req() req): Promise<void> {}

  @Get('apple/callback')
  @UseGuards(AuthGuard('apple'))
  appleAuthRedirect(@Req() req): any {
    return req.user;
  }
}
