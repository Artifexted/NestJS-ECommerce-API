import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './Middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  const loggerMiddleware = new LoggerMiddleware()

  app.use(loggerMiddleware.use);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Nest ecommerce API")
    .setDescription("API para ecommerce desarrollada con NestJS")
    .setVersion("1.0")
    .addBearerAuth()
    .build()

  const doc = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('API', app, doc, {
    customSiteTitle: "Nest ecommerce API"
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
