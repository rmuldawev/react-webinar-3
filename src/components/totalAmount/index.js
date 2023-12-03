import React from "react";
import PropTypes from "prop-types"
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

TotalAmount.propTypes = {
    price: PropTypes.string.isRequired,
    valute: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

export default React.memo(TotalAmount);
