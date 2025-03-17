import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import {useContainer} from "class-validator";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      console.error("Validation error:", JSON.stringify(errors, null, 2)); // Log validation errors
      return new BadRequestException(errors);
    },
  }));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors(); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
