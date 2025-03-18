import AddPerson from "@/components/AddPerson/AddPerson";
import PersonDashboard from "@/components/PersonDashboard/PersonDashboard";
import PersonList from "@/components/PersonList/PersonList";
import { Box, Grid, GridItem } from "@chakra-ui/react";

function Main() {
  return (
    <Grid
      templateColumns={{ base: "minmax(2,1fr)" , sm:"minmax(350px,20vw) 1fr"}}
      templateRows="calc(100vh - 50px)"
    >
      <GridItem
        border="1px solid"
        borderColor="gray.400"
        m="1vw"
        p={4}
        rounded={8}
        display="flex"
        flexDirection="column"
      >
        <AddPerson />
        <Box overflowY="scroll" flex="1">
          <PersonList />
        </Box>

      </GridItem>
      <GridItem
        border="1px solid"
        borderColor="gray.400"
        m="1vw"
        p={4}
        rounded={8}
      >
        <PersonDashboard></PersonDashboard>
      </GridItem>
    </Grid>
  );
}

export default Main;
