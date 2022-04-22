import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";


const COUNT_QUERY = gql`
  {
    CHC {
      getCharities(filters: {}) {
        count
        list(limit: 10) {
          id
          names {
            value
          }
          activities
        }
      }
    }
  }
`;

const LIST_QUERY = gql`
  {
    CHC {
      getCharities(filters: {}) {
        list(limit: 10) {
          id
          names {
            value
          }
          contact {
            phone
            address
            email
          }
        }
      }
    }
  }
`;

export const CharitiesCount = () => {
  const { loading, error, data } = useQuery(COUNT_QUERY);
  // console.log(typeof data.CHC.getCharities.list)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return <p>There are {data.CHC.getCharities.count} charities!</p>;
};

export const CharitiesList = () => {
  const { loading, error, data } = useQuery(LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  return (
      <div>
        {data.CHC.getCharities.list.map((charity) => (
          <div key={charity.id}>
            <p>Charity Name: {charity.names[0].value}</p>
            <div>
              <h2>Contact info:</h2>
              <p>Phone: {charity.contact.phone}</p>
              <p>Email: {charity.contact.email}</p>
              <p>Address: {charity.contact.address[0]}</p>
            </div>
          </div>
        ))}
      </div>
  );
};

