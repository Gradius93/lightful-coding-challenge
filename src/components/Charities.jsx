import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { Card } from "./Cards/MainCard";

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
          funding {
            grants {
              funder {
                name
              }
              amountAwarded
            }
          }
        }
      }
    }
  }
`;

export const CharitiesList = () => {
  const { loading, error, data } = useQuery(LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // map through data and pass data as props to Card component
  let list = data.CHC.getCharities.list.map((charity) => (
    <div key={charity.id} className="CardContainer">
      <h3>{charity.names[0].value}</h3>
      <Card
        phone={charity.contact.phone}
        email={charity.contact.email}
        address={charity.contact.address}
        income={charity.finances[0].income}
        spending={charity.finances[0].spending}
        grants={charity.funding.grants}
      />
    </div>
  ));
  // i know this might be wrong but this was the best way i could find 
  // to sort the data with the least income rendering first >.<
  return <div className="CharitiesContainer">{list.reverse()}</div>;
};
