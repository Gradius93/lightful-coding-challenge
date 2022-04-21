// yarn add apollo-boost @apollo/react-hooks graphql
import ApolloClient, { gql } from "apollo-boost"
import { ApolloProvider, useQuery } from "@apollo/react-hooks"

console.log(`${process.env.REACT_APP_API_KEY}`)

const apiKey = `${process.env.REACT_APP_CB_API_KEY}`;

const client = new ApolloClient({
  uri: "https://charitybase.uk/api/graphql",
  headers: {
    Authorization: `Apikey ${apiKey}`,
  },
})

const COUNT_QUERY = gql`
  {
    CHC {
      getCharities(filters: {}) {
        count
      }
    }
  }
`

const CharitiesCount = () => {
  const { loading, error, data } = useQuery(COUNT_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return <p>There are {data.CHC.getCharities.count} charities!</p>
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <h1>CharityBase Demo 🚀</h1>
      <CharitiesCount />
    </ApolloProvider>
  )
}

export default App