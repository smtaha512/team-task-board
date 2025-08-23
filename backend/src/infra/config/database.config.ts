import { Inject } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { KeysFromSnakeToCamelCase } from '../../shared/types/utility-types';

export interface EnvironmentVariablesForDatabaseConfig {
  DATABASE_SCHEMA: string;
  DATABASE_PASSWORD: string;
  DATABASE_USERNAME: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
  DATABASE_ENABLE_SSL: 'true' | 'false';
}

export interface DatabaseConfig
  extends KeysFromSnakeToCamelCase<
    Omit<EnvironmentVariablesForDatabaseConfig, 'DATABASE_ENABLE_SSL'>
  > {
  type: 'postgres';
  databaseEnableSsl: boolean;
}

export const DATABASE_CONFIG = 'DATABASE_CONFIG';

export const DatabaseConfigValidationSchema = Joi.object<
  EnvironmentVariablesForDatabaseConfig,
  true
>({
  DATABASE_SCHEMA: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_ENABLE_SSL: Joi.string().allow('true', 'false').required(),
});

export const databaseConfig = registerAs<DatabaseConfig>(
  DATABASE_CONFIG,
  () => {
    const {
      env: {
        DATABASE_SCHEMA,
        DATABASE_PASSWORD,
        DATABASE_USERNAME,
        DATABASE_HOST,
        DATABASE_PORT,
        DATABASE_NAME,
        DATABASE_ENABLE_SSL,
      },
    } = process;

    const config: DatabaseConfig = {
      databaseSchema: DATABASE_SCHEMA ?? '',
      databasePassword: DATABASE_PASSWORD ?? '',
      databaseUsername: DATABASE_USERNAME ?? '',
      databaseHost: DATABASE_HOST ?? '',
      databasePort: +(DATABASE_PORT ?? 5432),
      databaseName: DATABASE_NAME ?? '',
      databaseEnableSsl: DATABASE_ENABLE_SSL === 'true',
      type: 'postgres',
    };

    return config;
  },
);

export const DatabaseConfigInjectionKey = databaseConfig.KEY;
export const InjectDatabaseConfig = Inject(DatabaseConfigInjectionKey);
export const DatabaseConfigFeatureModule =
  ConfigModule.forFeature(databaseConfig);
