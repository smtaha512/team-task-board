import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import {
  DatabaseConfig,
  DatabaseConfigInjectionKey,
} from '../config/database.config';
import { dataSourceFactory } from './data-source';

export const databaseProvider: Provider<DataSource> = {
  provide: 'DATA_SOURCE',
  useFactory: async (databaseConfig: DatabaseConfig) => {
    const dataSource = await new DataSource(
      dataSourceFactory(databaseConfig),
    ).initialize();

    await dataSource
      .createQueryRunner()
      .createDatabase(databaseConfig.databaseName, /*ifNotExist = */ true);

    return dataSource;
  },
  inject: [DatabaseConfigInjectionKey],
};
