import { NestFactory } from '@nestjs/core';
import { env } from 'src/shared/env/dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(env.APP_PORT);
}
bootstrap();
