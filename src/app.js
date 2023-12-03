import React, { useCallback, useState } from "react";
//components
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ShoppingCartModal from "./components/modals/shoppingCartModal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isOpen, setIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const list = store.getState().list;
  const cartItems = store.getState().cart;
  console.log("cartItems", cartItems);

  const callbacks = {
    onAddToCart: useCallback(
      (code, count) => {
        store.addToCart(code, count);
      },
      [store]
    ),
    onRemoveFromCart: useCallback(
      (code) => {
        store.removeFromCart(code);
      },
      [store]
    ),

  };

  const handleTotalPriceChange = (newTotalPrice) => {
    setTotalPrice(newTotalPrice);
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls onAdd={() => setIsOpen(true)} items={cartItems} totalPrice={totalPrice} />
        <List
          list={list}
          onAddToCart={callbacks.onAddToCart}
        />
      </PageLayout>
      <ShoppingCartModal
        isOpen={isOpen}
        onClick={() => setIsOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={callbacks.onRemoveFromCart}
        onTotalPriceChange={handleTotalPriceChange}
      />
    </>
  );
}

export default App;
