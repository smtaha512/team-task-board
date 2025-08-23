import {
  ArgumentMetadata,
  Injectable,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import {
  defaultMessageFactoryForIsIdConstraint,
  isValidId,
} from '../class-validators/is-id.validator';

@Injectable()
export class ParseIdPipe extends ValidationPipe {
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    if (!metadata.data) {
      throw new InternalServerErrorException(
        "Please provide `property` parameter. Example: `@Query('some-property-name', ParseIdPipe)` or `@Param('some-property-name', ParseIdPipe)",
      );
    }

    if (isValidId(value)) {
      return value;
    }

    const error: ValidationError = {
      property: metadata.data,
      value,
      constraints: {
        [metadata.data]: defaultMessageFactoryForIsIdConstraint(
          `${metadata.data} in ${metadata.type}`,
        ),
      },
    };

    throw this.exceptionFactory([error]);
  }
}
