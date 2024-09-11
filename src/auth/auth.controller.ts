import { Controller,Post, UseGuards,Request,Get, Req, Res, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';


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
    @ResponseMessage("Create a new register")
    @Post('/register')
    async register(@Body() registerUserDto:RegisterUserDto) {
      return this.authService.register(registerUserDto);
    }
}
