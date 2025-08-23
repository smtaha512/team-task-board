import * as Joi from 'joi';
import { DatabaseConfigValidationSchema } from './database.config';
import { EnvConfigValidationSchema, EnvironmentVariables } from './env.config';
import { SrcConfigValidationSchema } from './src.config';

export type ConfigValidationSchema = EnvironmentVariables;
export const ConfigValidationSchema: Joi.ObjectSchema<ConfigValidationSchema> =
  Joi.object()
    .concat(DatabaseConfigValidationSchema)
    .concat(EnvConfigValidationSchema)
    .concat(SrcConfigValidationSchema);
