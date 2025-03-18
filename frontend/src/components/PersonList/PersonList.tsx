import { GetAllPersonsQuery } from "@/graphql/generated";
import { gql, useQuery } from "@apollo/client";
import { Box, Container, Flex, For, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const GET_ALL_PERSONS = gql`
  query GetAllPersons {
    getAllPersons {
      id
      name
      surname
    }
  }
`;

function PersonList() {
  const { error, loading, data } = useQuery<GetAllPersonsQuery>(GET_ALL_PERSONS);

  if (loading) return <Box textAlign="center">Loading.......</Box>;

  if (error) return <Box textAlign="center">{error.message}</Box>;

  if (data?.getAllPersons?.length == 0) return <Box textAlign="center">No data</Box>;

  return (
    <Flex direction="column" gap={4}>
      <For each={data?.getAllPersons!}>
        {(item, index) => (
          <Link to={"/" + item.id}>
            <Container
              key={index}
              w="full"
              border="1px solid gray"
              rounded={4}
              h="40px"
              lineHeight="40px"
              _hover={{ bg: "gray.300" }}
            >
              <Text fontWeight={500}>
                {item.name} {item.surname}
              </Text>
            </Container>
          </Link>
        )}
      </For>
    </Flex>
  );
}

export default PersonList;
