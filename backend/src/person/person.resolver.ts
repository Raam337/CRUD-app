import { Args, Mutation, Query, Resolver, PartialType } from '@nestjs/graphql';
import { Person } from './person.model';
import { PrismaClient } from '@prisma/client';
import { PersonService } from './person.service';
import { CreatePersonInput, EditPersonInput } from './person.types';


@Resolver(() => Person)
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => [Person], { nullable: true }) //Get all entries
  getAllPersons() {
    return this.personService.getPerson();
  }

  @Query(() => Person, { nullable: true }) //Get by ID
  getById(@Args("id") personId: number) {
    return this.personService.getPerson(personId);
  }

  @Mutation(() => Person) // Create new user
  createPerson(@Args('newPersonArgs') newPersonArgs : CreatePersonInput) {
    return this.personService.createPerson( newPersonArgs );
  }

  @Mutation(() => Person, { nullable: true }) // Edit by ID
  editPerson(
    @Args("id") personId: number,
    @Args('editPersonArgs') userArgs : EditPersonInput
  ) {
    return this.personService.editPerson( personId, userArgs );
  }

  @Mutation(() => Person, { nullable: true }) // Delete by ID
  deletePerson(@Args("id") personId: number) {
    return this.personService.deletePerson( personId );
  }
}