import { EditPersonInput, GetPersonByIdQuery } from "@/graphql/generated";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import {
  IconButton,
  Box,
  Text,
  Flex,
  Editable,
  Skeleton,
  EditableValueChangeDetails,
} from "@chakra-ui/react";
import { MdDeleteForever, MdOutlineClose } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_ALL_PERSONS } from "../PersonList/PersonList";
import { toaster } from "@/components/ui/toaster";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";

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

const DELETE_PERSON = gql`
  mutation DeletePerson($id: Float!) {
    deletePerson(id: $id) {
      id
      name
    }
  }
`;

function PersonDashboard() {
  //
  // Setup
  //
  const navigate = useNavigate()
  const { id: currentId } = useParams();
  
  const [editableValue, setEditableValue] = useState<EditPersonInput>({}); //Editable input value
  const [initValue, setInitValue] = useState<EditPersonInput>({}); //Value before edit
  const [updatePerson] = useMutation(UPDATE_PERSON);
  const [deletePerson] = useMutation(DELETE_PERSON);

  const { loading, data: person } = useQuery<GetPersonByIdQuery>(GET_BY_ID, {
    variables: { id: parseInt(currentId!) },
    skip: !currentId,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (person) {
      setEditableValue({ ...person.getById });
      setInitValue({ ...person.getById });
    }
  }, [person]);

  const handleChange = (
    val: EditableValueChangeDetails,
    key: (typeof entries)[keyof typeof entries]
  ) => {
    setEditableValue((prev) => ({ ...prev, [key]: val.value }));
  };

  const handleSubmit = async (key: keyof typeof entries) => {
    if (!currentId) return;

    try {
      let value = editableValue[entries[key]];
      if (key === "Phone number") value = parseInt(value);
      const a = await updatePerson({
        variables: {
          id: parseInt(currentId!),
          data: { [entries[key]]: value },
        },
        refetchQueries: [
          { query: GET_ALL_PERSONS },
          { query: GET_BY_ID, variables: { id: currentId } },
        ],
      });

      toaster.create({
        title: "Success",
        type: "success",
        description: `Record with Id - ${a.data.editPerson.id} has been modified`,
      });

    } catch (error) {
      setEditableValue((prev) => ({
        ...prev,
        [entries[key]]: initValue[entries[key]],
      }));
      toaster.create({
        title: "Error",
        type: "error",
        description: `Error occured: ${(error as Error).message}`,
      });
    }
  };

  const handleDelete = async () =>{
    try {
      const res = await deletePerson({
        variables: {
          id: parseInt(currentId!),
        },
        refetchQueries: [
          { query: GET_ALL_PERSONS },
        ]
      })

      toaster.create({
        title: "Success",
        type: "success",
        description: `${res.data.deletePerson.name} with Id ${res.data.deletePerson.id} - been deleted`,
      });

      navigate("/")

      
    } catch (error) {
      toaster.create({
        title: "Error",
        type: "error",
        description: `${(error as Error).message}`,
      });
    }
  }

  if (!person?.getById && !loading) return <Text fontWeight={500} fontSize={20}>Select an entry</Text>

  return (
    <>
      <Box as="main">
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
            aria-label="Delete Address"
            bg="gray.500"
            variant="solid"
            _hover={{ scale: "1.05" }}
            onClick={handleDelete}
          >
            <MdDeleteForever size="25px" />
          </IconButton>

          <IconButton
            aria-label="Close"
            colorPalette="gray"
            ml="auto"
            _hover={{ scale: "1.05" }}
            variant="solid"
            onClick={() => navigate("/")}
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
              <Skeleton key={key} h={8} my={4} w="30%"></Skeleton>
            ) : (
              <Editable.Root
                value={editableValue[key]?.toString()}
                onValueCommit={() => handleSubmit(value as keyof typeof entries)}
                onValueChange={(newVal) => handleChange(newVal, key)}
                key={key}
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
      </Box>
    </>
  );
}

export default PersonDashboard;
