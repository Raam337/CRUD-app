import { Button, Dialog, Field, HStack, Input, Portal, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { gql, useMutation } from "@apollo/client";

const schema = yup.object().shape({
  name: yup.string().required("First name is required"),
  surname: yup.string().required("Last name is required"),
  dob: yup.string().required("Date of birth is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.number().moreThan(3e9, "Phone number first digit must be greater than 3").lessThan(9e9, "Phone number first digit must be less than 9").required("Phone number is required")
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

  const onSubmit = (data: any) => {
    try {
      createPerson({ variables: { input: data } })
      console.log("Form Submitted:", data);
    } catch (e) {
      console.log("catch block")
      console.log(error.message)
    }
  };

  const onClose = () => {
    reset()
  };

  //
  //  API processing
  //

  const [createPerson, { data, loading, error }] = useMutation(CREATE_PERSON);

  return (
    <>
      <Dialog.Root onExitComplete={onClose}>
        <Dialog.Trigger asChild>
          <Button variant="outline" w="full" mb={6} bg="gray.700" color="white">
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
                        {errors.name && <Text color="red.500">{errors.name.message}</Text>}
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Last Name</Field.Label>
                        <Input placeholder="Last Name" {...register("surname")} />
                        {errors.surname && <Text color="red.500">{errors.surname.message}</Text>}
                      </Field.Root>
                    </HStack>

                    <Field.Root>
                      <Field.Label>Date of Birth</Field.Label>
                      <Input type="date" {...register("dob")} />
                      {errors.dob && <Text color="red.500">{errors.dob.message}</Text>}
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Email</Field.Label>
                      <Input type="email" placeholder="Email" {...register("email")} />
                      {errors.email && <Text color="red.500">{errors.email.message}</Text>}
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Phone Number</Field.Label>
                      <Input
                        placeholder="999 999 999"
                        {...register("phone")}
                        onChange={(e) => setValue("phone", e.target.value ? parseInt(e.target.value) : e.target.value )}
                      />
                      {errors.phone && <Text color="red.500">{errors.phone.message}</Text>}
                    </Field.Root>
                  </Stack>
                  <Dialog.Footer mt={4}>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button type="submit" variant="plain" bg="black" color="white">Save</Button>
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
