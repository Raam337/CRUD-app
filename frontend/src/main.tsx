import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client'
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Provider } from './components/ui/provider.tsx'

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
    </Provider>
  </StrictMode>,
)
