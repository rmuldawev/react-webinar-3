import React, { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import NavContainer from "../../components/nav-container";

function Main() {
  const store = useStore();

  const [pagination, setPagination] = useState({ limit: 10, skip: 0 });

  const updatePagination = (newLimit, newSkip) =>
    setPagination({ limit: newLimit, skip: newSkip });

  useEffect(() => {
    store.actions.catalog.load(pagination.limit, pagination.skip);
  }, [pagination]);

  const select = useSelector((state) => ({
    total: state.catalog.totalCount,
    currentPage: state.catalog.currentPage,
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.isLanguage.isLanguage,
    totalPages: state.catalog.totalPages,
  }));
  console.log("select.currentPage", select.currentPage);

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

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item item={item} onAdd={callbacks.addToBasket} lang={select.lang} />
        );
      },
      [callbacks.addToBasket, select.lang]
    ),
  };

  return (
    <PageLayout>
      <Head
        type=""
        onCLick={callbacks.toggleLanguage}
        key={select.lang}
        state={select.lang}
      />
      <NavContainer
        lang={select.lang}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        catalogState={{
          ...pagination,
          currentPage: select.currentPage,
          totalPages: select.totalPages,
        }}
        updatePagination={updatePagination}
      />
    </PageLayout>
  );
}

export default memo(Main);
