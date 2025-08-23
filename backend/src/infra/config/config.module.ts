import { Logger, Module } from '@nestjs/common';
import {
  ConfigFactory,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { ConfigValidationSchema } from './config-validation.schema';
import { databaseConfig, DatabaseConfig } from './database.config';
import { EnvConfig, envConfig, getEnvFilePath } from './env.config';
import { srcConfig, SrcConfig } from './src.config';

function validateEnvironmentConfig(
  config: ConfigValidationSchema,
): ConfigValidationSchema {
  const validationResult = ConfigValidationSchema.validate(config, {
    allowUnknown: true,
    stripUnknown: true,
  });

  if (validationResult.error) {
    Logger.error(
      `Error while parsing environment variables: ${validationResult.error.message}`,
      ConfigModule.name,
    );
    process.exit(1);
  }
  return validationResult.value;
}

type EnvConfigToLoad = [
  ConfigFactory<DatabaseConfig>,
  ConfigFactory<EnvConfig>,
  ConfigFactory<SrcConfig>,
];
const envConfigsToLoad: EnvConfigToLoad = [
  databaseConfig,
  envConfig,
  srcConfig,
];

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: envConfigsToLoad,
      validationSchema: ConfigValidationSchema,
      validationOptions: { abortEarly: true },
      validate: validateEnvironmentConfig,
    }),
  ],
})
export class ConfigModule {}
