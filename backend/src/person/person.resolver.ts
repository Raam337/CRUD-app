import { Args, Mutation, Query, Resolver, PartialType } from '@nestjs/graphql';
import { Person } from './person.model';
import { PrismaClient } from '@prisma/client';
import { PersonService } from './person.service';
import { CreatePersonInput, EditPersonInput } from './person.types';


@Resolver(() => Person)
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => [Person]) //Get all entries
  getAllPersons() {
    return this.personService.getPerson();
  }

  @Query(() => Person) //Get by ID
  getById(@Args("id") person_id: number) {
    return this.personService.getPerson(person_id);
  }

  @Mutation(() => Person) // Edit by ID
  editPerson(
    @Args("id") personId: number,
    @Args('editUserArgs') userArgs : EditPersonInput
  ) {
    return this.personService.editPerson( personId, userArgs );
  }

  @Mutation(() => Person) // Edit by ID
  deletePerson(@Args("id") personId: number) {
    return this.personService.deletePerson( personId );
  }
}