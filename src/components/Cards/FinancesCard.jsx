export const FinancesCard = ({ income, spending, grants }) => {
    // function for converting amount into gbp format
    let converted = (number) =>
      new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "GBP",
      }).format(number);
    
    // get various grants
    let grantAmount = grants.map((grant) => grant.amountAwarded);
    // add various grants together  
    let totalGrantAmount = grantAmount.reduce((a, b) => a + b, 0);
    
    // find percentage total grants are of income
    let percentage;
    if (totalGrantAmount > 0) {
      percentage = (totalGrantAmount / income) * 100;
    }
  
    return (
      <div className="FinancesCard">
        <h3>Finances</h3>
        <p>Income: {converted(income)}</p>
        <p>Spending: {converted(spending)}</p>
        {totalGrantAmount > 0 ? (
          <div>
            <p>Grants ({converted(totalGrantAmount)})</p>
            <p>({percentage.toFixed(4)}% of income)</p>
            <ul className="Grant">
              {grants.map((grant, id) => (
                <li key={id} className="grantListItem">
                  {grant.funder.name} ({converted(grant.amountAwarded)})
                </li>
              ))}
            </ul>
          </div>
        ) : (
          "No grants"
        )}
      </div>
    );
  };