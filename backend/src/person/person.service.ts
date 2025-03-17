import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreatePersonInput, EditPersonInput } from './person.types';
import { Person } from '@prisma/client';


@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  async getPerson( id?: number ): Promise<Person | Person[] | null> {
    if (id) return this.prisma.person.findUnique({ where: { id:id } });
    return this.prisma.person.findMany();
  }

  async createPerson( args : CreatePersonInput ): Promise<Person> {
    try {
      return await this.prisma.person.create({
        data: args,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(`Validation failed: ${error.message}`);
      }
      throw error;
    }

  }

  async editPerson( personId: number, args : EditPersonInput ): Promise<Person> {
    try {
      return await this.prisma.person.update({
        where: { id: personId },
        data: args,
      });
    } catch (error) {
      if ( error.code = "P2025" ){
        throw new NotFoundException(`Person with ID ${personId} not found.`);
      } else {
        throw new BadRequestException(`Validation issue: ${error.message}`)
      }
    }

  }

  async deletePerson( personId: number ): Promise<Person> {
    try {
      return await this.prisma.person.delete({
        where: { id: personId }
      })
    } catch (error) {
      if ( error.code = "P2025" ){
        throw new NotFoundException(`Person with ID ${personId} not found.`);
      } else {
        throw error
      }
    }
  }

}
