import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreatePersonInput = {
  dob: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['Float']['input'];
  surname: Scalars['String']['input'];
};

export type EditPersonInput = {
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['Float']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPerson: Person;
  deletePerson?: Maybe<Person>;
  editPerson?: Maybe<Person>;
};


export type MutationCreatePersonArgs = {
  newPersonArgs: CreatePersonInput;
};


export type MutationDeletePersonArgs = {
  id: Scalars['Float']['input'];
};


export type MutationEditPersonArgs = {
  editPersonArgs: EditPersonInput;
  id: Scalars['Float']['input'];
};

export type Person = {
  __typename?: 'Person';
  dob: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['Int']['output'];
  surname: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllPersons?: Maybe<Array<Person>>;
  getById?: Maybe<Person>;
};


export type QueryGetByIdArgs = {
  id: Scalars['Float']['input'];
};

export type CreatePersonMutationVariables = Exact<{
  input: CreatePersonInput;
}>;


export type CreatePersonMutation = { __typename?: 'Mutation', createPerson: { __typename?: 'Person', id: string, name: string, surname: string } };

export type GetAllPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPersonsQuery = { __typename?: 'Query', getAllPersons?: Array<{ __typename?: 'Person', id: string, name: string, surname: string }> | null };


export const CreatePersonDocument = gql`
    mutation CreatePerson($input: CreatePersonInput!) {
  createPerson(newPersonArgs: $input) {
    id
    name
    surname
  }
}
    `;
export type CreatePersonMutationFn = Apollo.MutationFunction<CreatePersonMutation, CreatePersonMutationVariables>;

/**
 * __useCreatePersonMutation__
 *
 * To run a mutation, you first call `useCreatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonMutation, { data, loading, error }] = useCreatePersonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePersonMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonMutation, CreatePersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonMutation, CreatePersonMutationVariables>(CreatePersonDocument, options);
      }
export type CreatePersonMutationHookResult = ReturnType<typeof useCreatePersonMutation>;
export type CreatePersonMutationResult = Apollo.MutationResult<CreatePersonMutation>;
export type CreatePersonMutationOptions = Apollo.BaseMutationOptions<CreatePersonMutation, CreatePersonMutationVariables>;
export const GetAllPersonsDocument = gql`
    query GetAllPersons {
  getAllPersons {
    id
    name
    surname
  }
}
    `;

/**
 * __useGetAllPersonsQuery__
 *
 * To run a query within a React component, call `useGetAllPersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPersonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPersonsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPersonsQuery, GetAllPersonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPersonsQuery, GetAllPersonsQueryVariables>(GetAllPersonsDocument, options);
      }
export function useGetAllPersonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPersonsQuery, GetAllPersonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPersonsQuery, GetAllPersonsQueryVariables>(GetAllPersonsDocument, options);
        }
export function useGetAllPersonsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllPersonsQuery, GetAllPersonsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllPersonsQuery, GetAllPersonsQueryVariables>(GetAllPersonsDocument, options);
        }
export type GetAllPersonsQueryHookResult = ReturnType<typeof useGetAllPersonsQuery>;
export type GetAllPersonsLazyQueryHookResult = ReturnType<typeof useGetAllPersonsLazyQuery>;
export type GetAllPersonsSuspenseQueryHookResult = ReturnType<typeof useGetAllPersonsSuspenseQuery>;
export type GetAllPersonsQueryResult = Apollo.QueryResult<GetAllPersonsQuery, GetAllPersonsQueryVariables>;