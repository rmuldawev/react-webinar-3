import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types"
//components
import Item from "../../item";
import CartHeader from "../../cartHeader";
import TotalAmount from "../../totalAmount";
//styles
import "../shoppingCartModal/styles.css";

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
        <CartHeader onClick={onClick} title={"Корзина"} />
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
        <TotalAmount
          price={totalPrice.toLocaleString("ru-RU")}
          valute={"₽"}
          title={"Итого:"}
        />
      </div>
    </Modal>
  );
};

ShoppingCartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onTotalPriceChange: PropTypes.func.isRequired,
};

export default ShoppingCartModal;
