import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Person {
  @Field(() => ID)
  id: number;

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