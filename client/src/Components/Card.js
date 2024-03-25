import React from "react";
import { Link } from "react-router-dom";

const Card = ({ img, Heading, amount, recommended, link }) => {
  return (
    <Link to={link} className="link">
      <div className="row__item">
        <img src={img} alt="" />
        <h3>{Heading}</h3>
        <p className="light-green">{amount}</p>
        <p className="light-green">
          {recommended && `Recommended:${recommended}`}
        </p>
      </div>
    </Link>
  );
};

export default Card;
