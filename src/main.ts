import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnection } from 'typeorm';
import * as dotenv from 'dotenv';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  //await getConnection().runMigrations();
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
