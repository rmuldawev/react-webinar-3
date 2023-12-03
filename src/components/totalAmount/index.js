import React from "react";
//styles
import "../totalAmount/styles.css";

const TotalAmount = ({ price, valute, title }) => {
  return (
    <div className="totalAmount">
      <p>{title}</p>
      <p>
        {price} <span className="symbol">{valute}</span>{" "}
      </p>
    </div>
  );
};

export default TotalAmount;
