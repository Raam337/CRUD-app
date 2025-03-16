import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  providers: [PersonService, PersonResolver, PrismaService]
})
export class PersonModule {}
