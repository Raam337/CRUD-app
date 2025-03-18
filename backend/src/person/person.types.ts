import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsDate, IsEmail, IsInt, IsNumber, IsString, Length, Max, MaxDate, Min, MinDate } from 'class-validator';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { IsEmailUnique } from 'src/services/validators/isEmailUnique';

@InputType()
export class CreatePersonInput {
  @Field()
  @IsString()
  @Length(1, 50) 
  name: string;

  @Field()
  @IsString()
  @Length(1, 50) 
  surname: string;

  @Field()
  @IsDate()
  @MinDate(new Date('1900-01-01'))
  @MaxDate(new Date()) 
  dob: Date;

  @Field()
  @IsNumber()
  @Min(3e7)
  @Max(9e7)
  phone: number;

  @Field()
  @IsEmail()
  @IsEmailUnique()
  email: string;
}

@InputType()
export class EditPersonInput extends PartialType(CreatePersonInput) {}