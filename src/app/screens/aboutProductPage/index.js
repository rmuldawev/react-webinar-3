import React from "react";
import { useParams } from "react-router-dom";
import Head from "../../../components/head";
import PageLayout from "../../../components/page-layout";
import BasketTool from "../../../components/basket-tool";
import { useCallback, useEffect } from "react";
import useStore from "../../../store/use-store";
import useSelector from "../../../store/use-selector";
import "../aboutProductPage/styles.css"

const AboutProductPage = () => {
  const store = useStore();
  const { itemId } = useParams();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    aboutProduct: state.datas.aboutProduct,
  }));

  console.log("select.list", select.list);

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
  };

  useEffect(() => {
    const fetchData = async () => {
      await store.actions.datas.loadAboutProduct(itemId);
    };
    fetchData();
  }, [itemId, store.actions.datas]);


  return (
    <PageLayout>
      <Head title={select.aboutProduct && select.aboutProduct.title} />

      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      {select.aboutProduct && (
        <div style={{ paddingLeft: "20px" }}>
          <p className="productText"> {select.aboutProduct.description}</p>
          <p className="productText">
            Страна производитель: <span className="boldText">{select.aboutProduct.madeIn.title}</span>{" "}
            <span className="boldText">({select.aboutProduct.madeIn.code})</span>
          </p>
          <p className="productText">Категория: <span className="boldText">{select.aboutProduct.category.title}</span></p>
          <p className="productText">Год выпуска:<span className="boldText"> {select.aboutProduct.edition}</span></p>
          <p className="priceText">Цена: {select.aboutProduct.price} <span className="priceText">₽</span> </p>

          <button
            onClick={() => callbacks.addToBasket(select.aboutProduct?._id)}
          >
            Добавить
          </button>
        </div>
      )}
    </PageLayout>
  );
};

export default React.memo(AboutProductPage);
