import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreatePersonInput, EditPersonInput } from './person.types';

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  async getPerson( id?: number) {
    if (id) return this.prisma.person.findUnique({ where: { id:id } });
    return this.prisma.person.findMany();
  }

  async createPerson( args : CreatePersonInput) {
    return this.prisma.person.create({
      data: args,
    });
  }

  async editPerson( personId: number, args : EditPersonInput ) {
    return this.prisma.person.update({
      where: { id: personId },
      data: args,
    });
  }

  async deletePerson( personId: number ) {
    return this.prisma.person.delete({
      where: { id: personId }
    });
  }
}
