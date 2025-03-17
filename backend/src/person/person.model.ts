import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

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

  @Field(() => Int)
  phone: number;

  @Field()
  email: string;
}