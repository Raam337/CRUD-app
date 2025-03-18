import { EditPersonInput, GetPersonByIdQuery } from "@/graphql/generated";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Text,
  Flex,
  Editable,
  Skeleton,
  EditableValueChangeDetails,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  MdOutlineEmail,
  MdDeleteForever,
  MdOutlineClose,
  MdEdit,
} from "react-icons/md";
import { useParams } from "react-router-dom";
import { schema } from "../AddPerson/AddPerson";
import { LuPencilLine, LuX, LuCheck } from "react-icons/lu";
import { useEffect, useState } from "react";
import { GET_ALL_PERSONS } from "../PersonList/PersonList";

const entries = {
  Name: "name",
  Surname: "surname",
  "Date of birth": "dob",
  Email: "email",
  "Phone number": "phone",
} as const;

const GET_BY_ID = gql`
  query GetPersonById($id: Float!) {
    getById(id: $id) {
      name
      surname
      email
      phone
      dob
    }
  }
`;

const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: Float!, $data: EditPersonInput!) {
    editPerson(id: $id, editPersonArgs: $data) {
      id
      name
    }
  }
`;

function PersonDashboard() {
  const { id: currentId } = useParams();

  const {
    error,
    loading,
    data: person,
  } = useQuery<GetPersonByIdQuery>(GET_BY_ID, {
    variables: { id: parseInt(currentId!) },
    skip: !currentId,
  });

  const [editableValue, setEditableValue] = useState<EditPersonInput>({});
  const [updatePerson, { loading: nutationLoading, error: mutationError }] = useMutation(UPDATE_PERSON);

  useEffect(() => {
    if (person) {
      setEditableValue({ ...person.getById }); // Set the initial value
    }
  }, [person]);


  const handleChange = (val : EditableValueChangeDetails, key : (typeof entries)[keyof typeof entries]) => {
    console.log(val,key)
    setEditableValue( prev => ({...prev, [key]:val.value}))
  }

  const handleSubmit = async ( key: keyof typeof entries ) => {

    console.log(key,[entries[key]], editableValue[entries[key]])
    if (!currentId) return

    try {
      const a = await updatePerson({
        variables: {
          id: parseInt(currentId!),
          data: { [entries[key]]: editableValue[entries[key]] },
        },
        refetchQueries: [
          { query: GET_ALL_PERSONS },
          { query: GET_BY_ID, variables: { id: currentId }}]
      })
      console.log(a)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(mutationError)

  return (
    <>
      <Flex
        as="menu"
        className="menu-bar"
        gap={2}
        align="center"
        p={2}
        rounded={8}
        bg="gray.200"
        border="1px solid"
        borderColor="gray.400"
      >
        <IconButton
          aria-label="Edit Record"
          bg="gray.700"
          variant="solid"
          _hover={{ scale: "1.05" }}
          //onClick={() => alert(`Email to ${addressData?.address} to be submitted.`)}
        >
          <MdEdit size="25px" />
        </IconButton>

        <IconButton
          aria-label="Delete Address"
          bg="gray.500"
          variant="solid"
          _hover={{ scale: "1.05" }}
        >
          <MdDeleteForever size="25px" />
        </IconButton>

        <IconButton
          aria-label="Close"
          colorPalette="gray"
          ml="auto"
          _hover={{ scale: "1.05" }}
          variant="solid"
          //onClick={() => setActiveAddress(null)}
        >
          <MdOutlineClose size="25px" />
        </IconButton>
      </Flex>

      <Box as="section" mt={4}>
        <Text fontSize="xl" my={3} fontWeight="bold">
          Detailed Information
        </Text>
        {Object.entries(entries).map(([value, key]) =>
          !person ? (
            <Skeleton h={8} my={4} w="30%"></Skeleton>
          ) : (
            <Editable.Root
              value={editableValue[key]?.toString()}
              onValueCommit={() => handleSubmit(value)}
              onValueChange={(newVal) => handleChange(newVal, key)}
            >
              <Text key={key}>
                <b>{value}:</b>
              </Text>
              <Editable.Preview pointerEvents="none" />
              <Editable.Input w="200px" />
              <Editable.Control>
                <Editable.EditTrigger asChild>
                  <IconButton variant="ghost" size="xs">
                    <LuPencilLine />
                  </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuX />
                  </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuCheck />
                  </IconButton>
                </Editable.SubmitTrigger>
              </Editable.Control>
            </Editable.Root>
          )
        )}
      </Box>
    </>
  );
}

export default PersonDashboard;
