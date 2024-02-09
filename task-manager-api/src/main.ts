import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as dotenv from "dotenv"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config()
  app.enableCors({
    origin: [process.env.HOST_WEB],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
  app.use(morgan('dev'))
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
  console.log(process.env.HOST_WEB)
}
bootstrap();
