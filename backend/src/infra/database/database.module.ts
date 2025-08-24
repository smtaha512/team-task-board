import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DatabaseConfigFeatureModule,
  DatabaseConfigInjectionKey,
} from '../config/database.config';
import { SrcConfigInjectionKey } from '../config/src.config';
import { dataSourceFactory } from './data-source';
import { databaseProvider } from './database.provider';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: dataSourceFactory,
      inject: [DatabaseConfigInjectionKey, SrcConfigInjectionKey],
    }),
    DatabaseConfigFeatureModule,
  ],
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
