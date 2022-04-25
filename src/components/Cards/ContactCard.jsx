export const ContactCard = ({ phone, email, address }) => {
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