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

const ContactCard = ({ phone, email, address }) => {
  return (
    <div className="ContactCard">
      <h3>Contact info:</h3>
      <p>Phone: {phone}</p>
      <p>Email: {email}</p>
      <p>
        Address:
        <br />
        {address[0]}
        <br /> {address[1]}
        <br />
        {address[2]}
        <br /> {address[3]}
      </p>
    </div>
  );
};

const FinancesCard = ({ income, spending }) => {
    
    let converted = (number) => new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP',
    }).format(number)
  return (
    <div className="FinancesCard">
      <h3>Finances</h3>
      <p>Income: {converted(income)}</p>
      <p>Spending: {converted(spending)}</p>
    </div>
  );
};

const Card = ({ phone, address, email, income, spending }) => {
  return (
    <div className="Card">
      <ContactCard phone={phone} address={address} email={email} />
      <FinancesCard income={income} spending={spending} />
    </div>
  );
};

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
    <div className="CharitiesContainer">
      {data.CHC.getCharities.list.map((charity) => (
        <div key={charity.id} className="CardContainer">
          <h3>{charity.names[0].value}</h3>
          <Card
            phone={charity.contact.phone}
            email={charity.contact.email}
            address={charity.contact.address}
            income={charity.finances[0].income}
            spending={charity.finances[0].spending}
          />
        </div>
      ))}
    </div>
  );
};
