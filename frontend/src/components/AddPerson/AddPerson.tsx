import {
  Button,
  Dialog,
  Field,
  HStack,
  Input,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { Toaster, toaster } from "@/components/ui/toaster";
import { GET_ALL_PERSONS } from "../PersonList/PersonList";
import { useState } from "react";
import { CreatePersonInput } from "@/graphql/generated";

export const schema = yup.object().shape({
  name: yup.string().matches(/^[A-Za-z]+$/, 'Name must contain only letters').required("First name is required"),
  surname: yup.string().matches(/^[A-Za-z]+$/, 'Surname must contain only letters').required("Last name is required"),
  dob: yup.string().required("Date of birth is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .number()
    .moreThan(30_000_000, "Phone number first digit must be greater than 3")
    .lessThan(90_000_000, "Phone number first digit must be less than 9")
    .required("Phone number is required"),
});

export const CREATE_PERSON = gql`
  mutation CreatePerson($input: CreatePersonInput!) {
    createPerson(newPersonArgs: $input) {
      id
      name
      surname
    }
  }
`;

function AddPerson() {
  const [open, setOpen] = useState(false);
  //
  // Form control
  //
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: CreatePersonInput) => {
    data.name = String(data.name).charAt(0).toUpperCase() + String(data.name).slice(1);
    data.surname = String(data.surname).charAt(0).toUpperCase() + String(data.surname).slice(1);
    try {
      await createPerson({ 
        variables: { input: data },
        refetchQueries: [
          { query: GET_ALL_PERSONS },
        ]
      }
    );

      toaster.create({
        title: "Success!",
        type: "success",
        description: `${data.name} has been added`,
      });

      setOpen(false)

    } catch (e) {
      toaster.create({
        title: "Error",
        type: "error",
        description: `Error: ${(e as Error).message}`,
      });
    }
  };

  //
  //  API processing
  //

  const [createPerson] = useMutation<CreatePersonInput>(CREATE_PERSON);

  return (
    <>
      <Toaster></Toaster>
      <Dialog.Root open={open} onPointerDownOutside={() => setOpen(false)} onExitComplete={() => reset()}>
        <Dialog.Trigger asChild>
          <Button
            variant="outline"
            _hover={{ scale: "1.05" }}
            w="full"
            mb={6}
            bg="gray.700"
            color="white"
            onClick={() => setOpen(true)}
          >
            Add new person
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Add new person</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack gap="4">
                    <HStack>
                      <Field.Root>
                        <Field.Label>First Name</Field.Label>
                        <Input placeholder="First Name" {...register("name")} />
                        {errors.name && (
                          <Text color="red.500">{errors.name.message}</Text>
                        )}
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Last Name</Field.Label>
                        <Input
                          placeholder="Last Name"
                          {...register("surname")}
                        />
                        {errors.surname && (
                          <Text color="red.500">{errors.surname.message}</Text>
                        )}
                      </Field.Root>
                    </HStack>

                    <Field.Root>
                      <Field.Label>Date of Birth</Field.Label>
                      <Input type="date" {...register("dob")} />
                      {errors.dob && (
                        <Text color="red.500">{errors.dob.message}</Text>
                      )}
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Email</Field.Label>
                      <Input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                      />
                      {errors.email && (
                        <Text color="red.500">{errors.email.message}</Text>
                      )}
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Phone Number</Field.Label>
                      <Input
                        placeholder="99 999 999"
                        {...register("phone")}
                        onChange={(e) =>
                          setValue(
                            "phone", parseInt(e.target.value)
                          )
                        }
                      />
                      {errors.phone && (
                        <Text color="red.500">{errors.phone.message}</Text>
                      )}
                    </Field.Root>
                  </Stack>
                  <Dialog.Footer mt={4}>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button
                      type="submit"
                      variant="plain"
                      bg="black"
                      color="white"
                    >
                      Submit
                    </Button>
                  </Dialog.Footer>
                </form>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}

export default AddPerson;
