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
          finances {
              income
              spending
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
      <div className="Container">
        {data.CHC.getCharities.list.map((charity) => (
          <div key={charity.id} className="Card">
            <h3>Charity Name: {charity.names[0].value}</h3>
            <div>
              <h3>Contact info:</h3>
              <p>Phone: {charity.contact.phone}</p>
              <p>Email: {charity.contact.email}</p>
              <p>Address: 
                  <br/>{charity.contact.address[0]}
                  <br/> {charity.contact.address[1]}
                  <br/>{charity.contact.address[2]}
                  <br/> {charity.contact.address[3]}
              </p>
            </div>
            <div>
                <h3>Finances</h3>
                <p>Income: {charity.finances[0].income}</p>
                <p>Spending: {charity.finances[0].spending}</p>
            </div>
          </div>
        ))}
      </div>
  );
};

