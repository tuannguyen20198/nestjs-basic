import { Controller,Post, UseGuards,Request,Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './decorator/customize';

@Controller()
export class AppController {
  constructor(
    private authService:AuthService
    ) 
    {}
  
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

    @Public()
    @Get('profile')
    getProfile(@Request() req) {
      return req.user
    }

    @Get('profile1')
    getProfile1(@Request() req) {
      return req.user
    }
}
