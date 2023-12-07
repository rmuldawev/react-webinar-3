import React from "react"
import PropTypes from "prop-types";



const AboutProductContainer = (props) => {
    return (
        <div>
          <p className="productText"> {props.desc}</p>
          <p className="productText">
            Страна производитель:{" "}
            <span className="boldText">{props.country}</span>{" "}
            <span className="boldText">
              ({props.code})
            </span>
          </p>
          <p className="productText">
            Категория:{" "}
            <span className="boldText">
              {props.category}
            </span>
          </p>
          <p className="productText">
            Год выпуска:
            <span className="boldText"> {props.year}</span>
          </p>
          <p className="priceText">
            Цена: {props.price}{" "}
            <span className="priceText">₽</span>{" "}
          </p>
          </div>
    )
}

AboutProductContainer.propTypes = {
    desc: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  };


export default React.memo(AboutProductContainer)