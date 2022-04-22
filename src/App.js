// yarn add apollo-boost @apollo/react-hooks graphql

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { CharitiesCount, CharitiesList } from "./components/Charities";

const apiKey = `${process.env.REACT_APP_CB_API_KEY}`;

const client = new ApolloClient({
  uri: "https://charitybase.uk/api/graphql",
  headers: {
    Authorization: `Apikey ${apiKey}`,
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <h1>CharityBase Demo 🚀</h1>
      <CharitiesCount />
      <CharitiesList />
    </ApolloProvider>
  );
};

export default App;
