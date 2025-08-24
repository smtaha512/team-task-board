import {
  INestApplication,
  ModuleMetadata,
  Type,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import {
  Test,
  TestingModuleBuilder,
  TestingModuleOptions,
} from '@nestjs/testing';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../../app.module';
import {
  DatabaseConfig,
  DatabaseConfigInjectionKey,
} from '../../infra/config/database.config';

export class TestApplication {
  private module: TestingModuleBuilder;
  private app: INestApplication;

  constructor(metadata?: ModuleMetadata, options?: TestingModuleOptions) {
    this.module = Test.createTestingModule(
      {
        ...metadata,
        imports: [AppModule, ...(metadata?.imports ?? [])],
        providers: [
          ...(metadata?.providers ?? []),
          {
            provide: APP_PIPE,
            useFactory: () =>
              new ValidationPipe({
                transform: true,
                transformOptions: { enableImplicitConversion: true },
              }),
          },
        ],
      },
      options,
    );
  }

  async beforeAll() {
    const module = await this.module.compile();

    this.app = module.createNestApplication();
    await this.app.init();
  }

  async beforeEach() {
    await this.refreshSchema();
  }

  async afterAll() {
    const dataSource = this.app.get(DataSource);

    await dataSource.destroy();

    await this.app.close();
  }

  request(method: 'get' | 'post' | 'put' | 'delete' | 'patch', path: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(this.httpServer)[method](path);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  get<T>(typeOrToken: string | Function | Type<T>): T {
    return this.app.get(typeOrToken);
  }

  private get httpServer() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.app.getHttpServer();
  }

  private async refreshSchema() {
    const databaseConfig = this.app.get<DatabaseConfig>(
      DatabaseConfigInjectionKey,
    );

    const schema = databaseConfig.databaseSchema;

    const dataSource = this.app.get(DataSource);
    await dataSource.dropDatabase();

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.dropSchema(schema, /* ifExist = */ true);
    await queryRunner.createSchema(schema, /* ifNotExist = */ true);

    await queryRunner.manager.connection.runMigrations();
  }
}
