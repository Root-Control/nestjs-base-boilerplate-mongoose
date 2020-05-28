import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { EnvironmentService } from './environment.variables';
import { AppModule } from './app.module';

import { join } from 'path';

import { yellow } from 'chalk';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HTTP_SERVER_PORT } from './server.constants';

async function bootstrap() {
    const environment = new EnvironmentService('.env');
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

const options = new DocumentBuilder()
    .setTitle('Duopoly Application ')
    .setDescription('The cats API description')
    //.setVersion('1.0')
    .addTag('Architecture')
    .build();
 
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    app.enableCors();
    app.setGlobalPrefix('api');
    app.useStaticAssets(join(__dirname, '/../public'));

    await app.listen(HTTP_SERVER_PORT);
    console.log(yellow('[Duopoly] V.1.0   -'));
    console.log(`Environment -> ${environment.get('NODE_ENV')}`);
    console.log(`Port -> ${HTTP_SERVER_PORT}`);
}
bootstrap();
