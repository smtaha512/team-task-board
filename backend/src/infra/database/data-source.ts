import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { DatabaseConfig } from '../config/database.config';

export type CustomDataSourceOptions = DataSourceOptions & TypeOrmModuleOptions;

export function dataSourceFactory(
  databaseConfig: DatabaseConfig,
): CustomDataSourceOptions {
  const url = `postgres://${databaseConfig.databaseUsername}:${databaseConfig.databasePassword}@${databaseConfig.databaseHost}:${databaseConfig.databasePort}/${databaseConfig.databaseName}`;

  const ssl = databaseConfig.databaseEnableSsl
    ? { rejectUnauthorized: true }
    : false;

  return {
    ssl,
    schema: databaseConfig.databaseSchema,
    url,
    type: databaseConfig.type,
    dropSchema: false,
    synchronize: false,
    autoLoadEntities: true,
    useUTC: true,
  };
}
