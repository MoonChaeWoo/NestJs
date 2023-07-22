import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
  });
  const port = 3001;
  await app.listen(port);
  Logger.log(`Nest Js Start Port =====> ${port}`);
}
bootstrap();
