import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

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
              awardDate
            }
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

const FinancesCard = ({ income, spending, grants }) => {
  let converted = (number) =>
    new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
    }).format(number);
  let grantAmount = grants.map((grant) => grant.amountAwarded);
  let totalGrantAmount = grantAmount.reduce((a, b) => a + b, 0);
  
  
  const percentage = (totalGrantAmount / income) * 100;

  console.log(percentage);
  return (
    <div className="FinancesCard">
      <h3>Finances</h3>
      <p>Income: {converted(income)}</p>
      <p>Spending: {converted(spending)}</p>
        {totalGrantAmount > 0 ? 
        <div>
            <p>Grants ({converted(totalGrantAmount)})</p>
            <ul className="Grant">
                {grants.map((grant, id) => (
                    <li key={id} className="grantListItem">
              {grant.funder.name} ({converted(grant.amountAwarded)})
            </li>
          ))}
        </ul>
        </div> : 'No grants'
}
    </div>
  );
};

const Card = ({ phone, address, email, income, spending, grants }) => {
  return (
    <div className="Card">
      <ContactCard phone={phone} address={address} email={email} />
      <FinancesCard income={income} spending={spending} grants={grants} />
    </div>
  );
};

export const CharitiesList = () => {
  const { loading, error, data } = useQuery(LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
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
  console.log(data);

  return <div className="CharitiesContainer">{list.reverse()}</div>;
};
