import { BadRequestException, PipeTransform } from '@nestjs/common';
import { z, ZodSchema } from 'zod';

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private readonly schema: ZodSchema<T>) {}

  transform(value: T): T {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          details: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            error: issue.message,
          })),
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
