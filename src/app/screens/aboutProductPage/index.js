import React from "react";
import { useParams } from "react-router-dom";
import Head from "../../../components/head";
import PageLayout from "../../../components/page-layout";
import BasketTool from "../../../components/basket-tool";
import { useCallback, useEffect } from "react";
import useStore from "../../../store/use-store";
import useSelector from "../../../store/use-selector";
import "../aboutProductPage/styles.css";
import AboutProductContainer from "../../../components/aboutProductContainer";

const AboutProductPage = () => {
  const store = useStore();
  const { itemId } = useParams();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    aboutProduct: state.datas.aboutProduct,
    lang: state.isLanguage.isLanguage,
  }));

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    closeModal: useCallback(
      () => store.actions.modals.close("basket"),
      [store]
    ),
    toggleLanguage: useCallback(
      () => store.actions.isLanguage.toggleLanguage(),
      [store]
    ),
  };

  useEffect(() => {
    const fetchData = async () => {
      await store.actions.datas.loadAboutProduct(itemId);
    };
    fetchData();
  }, [itemId, store.actions.datas]);

  return (
    <PageLayout>
      <Head
        onCLick={callbacks.toggleLanguage}
        title={select.aboutProduct && select.aboutProduct.title}
        state={select.lang}
        type={"aboutProduct"}
      />

      <BasketTool
        lang={select.lang}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      {select.aboutProduct !== null && (
        <div style={{ paddingLeft: "50px", paddingRight:"41px" }}>
          <AboutProductContainer
            desc={select.aboutProduct.description}
            country={select.aboutProduct.madeIn.title}
            code={select.aboutProduct.madeIn.code}
            category={select.aboutProduct.category.title}
            year={select.aboutProduct.edition}
            price={select.aboutProduct.price}
          />
          <button
            onClick={() => callbacks.addToBasket(select.aboutProduct?._id)}
          >
            {select.lang ? "Add to Basket" : "Добавить"}
          </button>
        </div>
      )}
    </PageLayout>
  );
};

export default React.memo(AboutProductPage);
