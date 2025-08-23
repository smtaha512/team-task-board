import { Inject, Logger } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { KeysFromSnakeToCamelCase } from '../../shared/types/utility-types';

type APP_TIMEZONE = 'UTC';
const validTimezones: APP_TIMEZONE[] = ['UTC'];

export interface EnvironmentVariables {
  ALLOWED_CORS_ORIGINS: string;
  APP_NAME: string;
  CORS_MAX_AGE_IN_SECONDS: number;
  NODE_ENV: Environments;
  PORT: number;
  TZ: APP_TIMEZONE;
}

export type EnvConfig = KeysFromSnakeToCamelCase<
  Omit<EnvironmentVariables, 'ALLOWED_CORS_ORIGINS'> &
    Record<'ALLOWED_CORS_ORIGINS', string[]>
>;
export type EnvFilePath = `.env.${Environments}`;

export enum Environments {
  LOCAL = 'local',
  TEST = 'test',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  STAGING = 'staging',
}

export const environments = Object.values(Environments);
const nodeEnvValidationSchema = Joi.object<
  Pick<EnvironmentVariables, 'NODE_ENV'>,
  true
>({
  NODE_ENV: Joi.string()
    .valid(...environments)
    .required(),
});
export const getEnvFilePath: () => EnvFilePath | undefined = () => {
  const envValidationError = nodeEnvValidationSchema
    .validate(process.env, { allowUnknown: true })
    .error?.details.map((item) => item.message)
    .join('\n');

  if (envValidationError) {
    Logger.debug(
      'No environment variable file provided, defaulting to undefined',
    );
    // throw new Error(envValidationError);
    return undefined;
  }

  const currentEnvironment = process.env.NODE_ENV as Environments;
  return `.env.${currentEnvironment}`;
};

/**
 ** `^(https?):\/\/`: Start of the string, with http, or https protocols.
 ** `[^\s,]+`: The main URI part, ensuring no spaces or commas inside the URI.
 ** `(?:\s*,\s*[^\s,]+)*`: Non-capturing group matching additional URIs after commas, with optional spaces before and after the comma.
 ** `$`: End of the string.
 **/
const uriPattern = /^(https?):\/\/[^\s,]+(?:\s*,\s*[^\s,]+)*$/;
export const EnvConfigValidationSchema = Joi.object<EnvironmentVariables, true>(
  {
    ALLOWED_CORS_ORIGINS: Joi.string().pattern(uriPattern),
    APP_NAME: Joi.string().required(),
    CORS_MAX_AGE_IN_SECONDS: Joi.number(),
    NODE_ENV: Joi.string()
      .valid(...environments)
      .required(),
    PORT: Joi.number().required(),
    TZ: Joi.string()
      .valid(...validTimezones)
      .required(),
  },
);

export const ENV_CONFIG = 'ENV_CONFIG';
export const envConfig = registerAs<EnvConfig>(ENV_CONFIG, () => {
  const {
    env: {
      ALLOWED_CORS_ORIGINS,
      APP_NAME,
      CORS_MAX_AGE_IN_SECONDS,
      NODE_ENV,
      PORT,
      TZ,
    },
  } = process;

  const config: EnvConfig = {
    allowedCorsOrigins: ALLOWED_CORS_ORIGINS?.split(',') ?? [],
    appName: APP_NAME ?? '',
    corsMaxAgeInSeconds: +(CORS_MAX_AGE_IN_SECONDS ?? ''),
    nodeEnv: NODE_ENV as Environments,
    port: +(PORT ?? 3000),
    tz: TZ as APP_TIMEZONE,
  };

  return config;
});

export const EnvConfigInjectionKey = envConfig.KEY;
export const InjectEnvConfig = Inject(EnvConfigInjectionKey);
export const EnvConfigFeatureModule = ConfigModule.forFeature(envConfig);
