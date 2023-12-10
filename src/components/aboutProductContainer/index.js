import React from "react";
import PropTypes from "prop-types";
import '../aboutProductContainer/styles.css'

const AboutProductContainer = (props) => {
  return (
    <div className="productContainer">
      <p className="productText"> {props.desc}</p>
      <p className="productText">
        Страна производитель: <span className="boldText">{props.country}</span>{" "}
        <span className="boldText">({props.code})</span>
      </p>
      <p className="productText">
        Категория: <span className="boldText">{props.category}</span>
      </p>
      <p className="productText">
        Год выпуска:
        <span className="boldText"> {props.year}</span>
      </p>
      <p className="priceText">
        Цена: {props.price} <span className="priceText">₽</span>{" "}
      </p>
      <button style={{ cursor: "pointer" }} onClick={props.onClick}>
        {props.lang ? "Add to Basket" :
        "Добавить"}
      </button>
    </div>
  );
};

AboutProductContainer.propTypes = {
  desc: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  year: PropTypes.node.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired, 
  lang: PropTypes.bool.isRequired,
};

export default React.memo(AboutProductContainer);
