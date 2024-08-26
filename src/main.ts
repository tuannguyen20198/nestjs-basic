import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  // Các cấu hình khác
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.useGlobalPipes(new ValidationPipe());

  // Cấu hình CORS với NestJS (Có thể bỏ qua nếu bạn đã dùng middleware cors)
  app.enableCors({
    origin: '*', // Có thể thay đổi thành danh sách các nguồn được phép
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue:false
  });

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
