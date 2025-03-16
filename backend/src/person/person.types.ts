import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreatePersonInput {
  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  dob: Date;

  @Field()
  phone: number;

  @Field()
  email: string;
}

@InputType()
export class EditPersonInput extends PartialType(CreatePersonInput) {}