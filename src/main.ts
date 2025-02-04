import { NestFactory } from '@nestjs/core';
import { env } from 'src/shared/env/dotenv';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filter/all-exceptions.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const logger = new Logger('Main');

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(env.APP_PORT);

  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
