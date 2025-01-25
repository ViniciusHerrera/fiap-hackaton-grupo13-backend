import { NestFactory } from '@nestjs/core';
import { env } from 'src/shared/env/dotenv';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filter/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(env.APP_PORT);
}
bootstrap();
