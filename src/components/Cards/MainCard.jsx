import { ContactCard } from "./ContactCard";
import { FinancesCard } from "./FinancesCard";

export const Card = ({ phone, address, email, income, spending, grants }) => {
    return (
      <div className="Card">
        <ContactCard phone={phone} address={address} email={email} />
        <FinancesCard income={income} spending={spending} grants={grants} />
      </div>
    );
  };