import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnection } from 'typeorm';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //await getConnection().runMigrations();
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
