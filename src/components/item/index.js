import React from "react";
import PropTypes from "prop-types";
//styles
import "./style.css";

function Item(props) {
  const { item, isInCartPage, onAddToCart, onRemoveFromCart } = props;

  return (
    <div className={"Item"}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="priceBox">
        <p>{item.price.toLocaleString('ru-RU')}</p>
        <p>₽</p>
        
      {isInCartPage &&  <div className="countBox">
        <p>{item.count}</p>
        <p>шт</p>
        </div>}
      </div>

      <div className="Item-actions">
       
        {isInCartPage ? (
          <button onClick={() => onRemoveFromCart(item.code)}>Удалить</button>
        ) : (
          <>
            <button onClick={() => onAddToCart(item.code, 1)}>Добавить</button>
          </>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  isInCartPage: PropTypes.bool,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
};

Item.defaultProps = {
  isInCartPage: false,
  onAddToCart: () => {},
  onRemoveFromCart: () => {},
  countInCart: 0,
};

export default React.memo(Item);
