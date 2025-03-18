import { Dialog, Button, Portal, Stack, HStack, Field, Input } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../AddPerson/AddPerson";
import { useForm } from "react-hook-form";

function PersonDataModal({ onSubmitCallback, children }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Dialog.Root onExitComplete={() => reset()}>
      <Dialog.Trigger asChild>
        { children }
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add new person</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <form onSubmit={handleSubmit(onSubmitCallback)}>
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
                      <Input placeholder="Last Name" {...register("surname")} />
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
                      placeholder="999 999 999"
                      {...register("phone")}
                      onChange={(e) =>
                        setValue(
                          "phone",
                          e.target.value
                            ? parseInt(e.target.value)
                            : e.target.value
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
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button
                    type="submit"
                    variant="plain"
                    bg="black"
                    color="white"
                  >
                    Save
                  </Button>
                </Dialog.Footer>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default PersonDataModal;
