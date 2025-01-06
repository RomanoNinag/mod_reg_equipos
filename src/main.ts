import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: envs.rabbitmqServers,
      queue: 'main_queue',
    },
  });

  // app.setGlobalPrefix('articulo')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  // app.enableCors({
  //   origin: '*', // Permite cualquier origen. Cambia '*' por una URL específica para mayor seguridad.
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true, // Permite el envío de cookies en las solicitudes
  // });

  // await app.listen(3000);
  // await app.listen(parseInt(process.env.PORT) || 3001);
  await app.listen();

}
bootstrap();
