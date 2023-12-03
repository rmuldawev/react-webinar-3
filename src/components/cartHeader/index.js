import React from "react";
import PropTypes from "prop-types";
import "../cartHeader/styles.css";

const CartHeader = ({ onClick, title }) => {
  return (
    <div className="titleHead">
      <h1>{title}</h1>
      <button className="headButton" onClick={onClick}>
        Закрыть
      </button>
    </div>
  );
};

CartHeader.propTypes = {
    title: PropTypes.node, 
    onClick: PropTypes.func.isRequired, 
  };

export default React.memo(CartHeader);
