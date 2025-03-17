import { Box } from '@chakra-ui/react'
import Main from './pages/Main'
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Box as="header" h="50px" bg="black"></Box>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/:id' element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
