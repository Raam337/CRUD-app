import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { IsEmailUniqueConstraint } from '../services/validators/isEmailUnique';

@Module({
  providers: [PersonService, PersonResolver, PrismaService, IsEmailUniqueConstraint]
})
export class PersonModule {}
