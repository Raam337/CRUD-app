import AddPerson from "@/components/AddPerson/AddPerson"
import PersonList from "@/components/PersonList/PersonList"
import { Grid, GridItem } from "@chakra-ui/react"

function Main() {
  return (
    <Grid templateColumns="minmax(300px,20vw) 1fr" templateRows="calc(100vh - 50px)">
      <GridItem overflowY="auto" border="1px solid gray" p="8%">
        <AddPerson />
        <PersonList />
      </GridItem>
    </Grid>
  )
}

export default Main