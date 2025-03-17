import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationError } from 'class-validator';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    const existingPerson = await this.prisma.person.findUnique({
      where: { email },
    });
    return !existingPerson;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be unique.`;
  }
}

export function IsEmailUnique() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsEmailUnique',
      target: object.constructor,
      propertyName: propertyName,
      validator: IsEmailUniqueConstraint,
    });
  };
}
