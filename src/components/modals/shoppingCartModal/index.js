import React from "react";
import Modal from "react-modal";
import "../shoppingCartModal/styles.css";
import Item from "../../item";

const ShoppingCartModal = ({
  isOpen,
  onClick,
  cartItems,
  onRemoveFromCart,
  onTotalPriceChange,
}) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.count * item.price,
    0
  );
  onTotalPriceChange(totalPrice);

  return (
    <Modal isOpen={isOpen} className="Modal">
      <div className="container">
        <div className="titleHead">
          <h1>Корзина</h1>
          <button className="headButton" onClick={onClick}>
            Закрыть
          </button>
        </div>

        <div className="cartItems">
          {cartItems.length > 0 ? (
            cartItems.map((item, i) => {
              return (
                <div className="cartItemStyle">
                  <Item
                    item={item}
                    key={i}
                    isInCartPage={true}
                    onRemoveFromCart={onRemoveFromCart}
                  />
                </div>
              );
            })
          ) : (
            <p className="noItems">Нет товаров в корзине</p>
          )}
        </div>

        <div className="totalAmount">
          <p>Итого:</p>

          <p>
            {totalPrice.toLocaleString("ru-RU")}{" "}
            <span className="symbol">₽</span>{" "}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ShoppingCartModal;
