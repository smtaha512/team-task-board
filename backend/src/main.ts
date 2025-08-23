import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiDocsConfig } from './infra/config/api-docs.config';
import { EnvConfig, EnvConfigInjectionKey } from './infra/config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port, allowedCorsOrigins } = app.get<EnvConfig>(
    EnvConfigInjectionKey,
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  ApiDocsConfig.setupApiDocs(app);

  app.enableCors({
    origin: allowedCorsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    maxAge: 86400, // 24 hours
  });

  await app.listen(port);

  Logger.debug(`Application running at PORT ${port}`, 'main');
}

bootstrap().catch((error) => {
  Logger.error(error);
});
