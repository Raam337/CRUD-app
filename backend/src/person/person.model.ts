import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

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

  @Field(() => Float)
  phone: number;

  @Field()
  email: string;
}