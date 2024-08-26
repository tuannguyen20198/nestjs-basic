import { Controller,Post, UseGuards,Request,Get, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';


@Controller("auth")
export class AuthController {
  constructor(
    private authService:AuthService,
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
