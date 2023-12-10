import React from "react";
import { useParams } from "react-router-dom";
import Head from "../../../components/head";
import PageLayout from "../../../components/page-layout";
import { useCallback, useEffect } from "react";
import useStore from "../../../store/use-store";
import useSelector from "../../../store/use-selector";
import AboutProductContainer from "../../../components/about-product-container";
import NavContainer from "../../../components/nav-container";
import Spinner from "../../../components/spiner";

const AboutProductPage = () => {
  const store = useStore();
  const { itemId } = useParams();

  const { amount, sum, aboutProduct, lang } = useSelector((state) => ({
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

    return () => {
      store.actions.datas.clearAboutProduct();
    };
  }, [itemId, store.actions.datas]);

  return (
    <PageLayout>
      <Head
        onCLick={callbacks.toggleLanguage}
        title={aboutProduct?.title}
        state={lang}
        type={"aboutProduct"}
      />
      <NavContainer
        lang={lang}
        onOpen={callbacks.openModalBasket}
        amount={amount}
        sum={sum}
      />
      {aboutProduct ? (
        <AboutProductContainer
          desc={aboutProduct.description}
          country={aboutProduct.madeIn?.title}
          code={aboutProduct.madeIn?.code}
          category={aboutProduct.category?.title}
          year={aboutProduct.edition}
          price={aboutProduct.price || 0}
          onClick={() => callbacks.addToBasket(aboutProduct._id)}
          lang={lang}
        />
      ) : (
        <Spinner />
      )}
    </PageLayout>
  );
};

export default React.memo(AboutProductPage);
