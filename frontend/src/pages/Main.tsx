import AddPerson from "@/components/AddPerson/AddPerson"
import PersonDashboard from "@/components/PersonDashboard/PersonDashboard"
import PersonList from "@/components/PersonList/PersonList"
import { Grid, GridItem } from "@chakra-ui/react"

function Main() {
  return (
    <Grid templateColumns="minmax(300px,20vw) 1fr" templateRows="calc(100vh - 50px)">
      <GridItem overflowY="auto" border="1px solid" borderColor="gray.400" m="1vw" p={4} rounded={8}>
        <AddPerson />
        <PersonList />
      </GridItem>
      <GridItem border="1px solid" borderColor="gray.400" m="1vw" p={4} rounded={8}>
        <PersonDashboard></PersonDashboard>
      </GridItem>
    </Grid>
  )
}

export default Main