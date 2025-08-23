import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isUUID,
  registerDecorator,
} from 'class-validator';

export function isValidId(value: string): boolean {
  if (typeof value !== 'string') return false;
  const [prefix, uuid] = value.trim().split('_');

  if (prefix.length < 1 || prefix.length > 4) {
    return false;
  }

  return isUUID(uuid);
}

export function defaultMessageFactoryForIsIdConstraint(
  propertyOrPropertyPath: string,
) {
  return `${propertyOrPropertyPath} is not a valid id`;
}

@ValidatorConstraint({ async: false })
export class IsIdConstraint implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments) {
    return isValidId(value);
  }

  defaultMessage(args: ValidationArguments) {
    return defaultMessageFactoryForIsIdConstraint(args.property);
  }
}

export function IsId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsIdConstraint,
    });
  };
}
