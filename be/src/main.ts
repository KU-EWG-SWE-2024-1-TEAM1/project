import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/GlobalExceptionFilter';
import { corsOptions } from "./config/corsConfig";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(3001);
}
bootstrap();
