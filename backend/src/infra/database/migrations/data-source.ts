import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DataSource } from 'typeorm';
import { ConfigModule } from '../../config/config.module';
import {
  DatabaseConfig,
  DatabaseConfigInjectionKey,
} from '../../config/database.config';
import { SrcConfig, SrcConfigInjectionKey } from '../../config/src.config';
import { CustomDataSourceOptions, dataSourceFactory } from '../data-source';

async function buildDataSourceForMigrations(): Promise<DataSource> {
  const app = await NestFactory.create<NestExpressApplication>(ConfigModule);

  const databaseConfig = app.get<DatabaseConfig>(DatabaseConfigInjectionKey);
  const srcConfig = app.get<SrcConfig>(SrcConfigInjectionKey);
  const { srcFileExtension, srcRoot } = srcConfig;

  const dataSourceOptions: CustomDataSourceOptions = {
    ...dataSourceFactory(databaseConfig, srcConfig),
    entities: [`${srcRoot}/modules/**/*.typeorm.entity.${srcFileExtension}`],
  };

  const dataSource = new DataSource(dataSourceOptions);

  await dataSource.initialize();

  await dataSource
    .createQueryRunner()
    .createSchema(databaseConfig.databaseSchema, /* ifNotExist = */ true);

  // Since TypeORM will initialize the dataSource internally we need to destroy it here otherwise it will throw error
  await dataSource.destroy();

  // Returning the dataSource from above will throw error
  return new DataSource(dataSourceOptions);
}

export default buildDataSourceForMigrations();
