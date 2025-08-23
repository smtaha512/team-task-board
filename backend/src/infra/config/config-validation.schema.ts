import * as Joi from 'joi';
import { EnvConfigValidationSchema, EnvironmentVariables } from './env.config';

export type ConfigValidationSchema = EnvironmentVariables;
export const ConfigValidationSchema: Joi.ObjectSchema<ConfigValidationSchema> =
  Joi.object().concat(EnvConfigValidationSchema);
