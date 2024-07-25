import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './passport/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Module({
  imports:[UsersModule,PassportModule],
  providers: [AuthService,LocalStrategy],
})
export class AuthModule {}
