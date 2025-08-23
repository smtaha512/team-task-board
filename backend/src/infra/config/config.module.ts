import { Logger, Module } from '@nestjs/common';
import {
  ConfigFactory,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { ConfigValidationSchema } from './config-validation.schema';
import { EnvConfig, envConfig, getEnvFilePath } from './env.config';

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

type EnvConfigToLoad = [ConfigFactory<EnvConfig>];
const envConfigsToLoad: EnvConfigToLoad = [envConfig];

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
