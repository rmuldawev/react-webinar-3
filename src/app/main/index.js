import React, { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import '../main/styles.css'



function Main() {
  const store = useStore();

  const [pagination, setPagination] = useState({ limit: 10, skip: 0 });
  const [totalCount, setTotalCount] = useState(0);

  const updatePagination = (newLimit, newSkip) =>
    setPagination({ limit: newLimit, skip: newSkip });

  useEffect(() => {
    store.actions.catalog.load(pagination.limit, pagination.skip);
  }, [pagination]);

  useEffect(() => {
    setTotalCount(store.getState().catalog.totalCount || 0);
  }, [store.getState().catalog.totalCount]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    // lang: state.isLanguage.isLanguage
    lang: state.isLanguage.isLanguage,
  }));

  console.log('select.lang',select.lang)

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    closeModal:  useCallback(
      () => store.actions.modals.close("basket"),
      [store]
    ),
    toggleLanguage: useCallback (
      () =>  store.actions.isLanguage.toggleLanguage(), [store]
    )

  };

  // const toggleLanguage = useCallback(() => {
  //   store.actions.isLanguage.toggleLanguage();
  // }, [store]);

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalCount / pagination.limit);
    const currentPage = Math.ceil((pagination.skip + 1) / pagination.limit);
  
    const pages = [];
    console.log(totalPages)
  
    for (let i = 1; i <= totalPages; i++) {
      const isCurrentPage = i === currentPage;
  
      if (
        i === 1 || 
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
    
        pages.push(
          <button
            key={i}
            onClick={() => updatePagination(10, (i - 1) * 10)}
            className={isCurrentPage ? 'pagination_active_button' :'pagination-button'}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(<span key={i} style={{color:'#CCCCCC'}}>...</span>);
      }
    }
  
    return pages;
  };

  
  
  
  


  
  return (
    <PageLayout>
      <Head onCLick={callbacks.toggleLanguage} key={select.lang} state={select.lang}/>
      <BasketTool
      
        state={select.lang }
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item}  />

      <div style={{ display: "flex", justifyContent: "flex-end",marginTop:'22px',marginRight:'21px'}}>
        {renderPagination()}
      </div>
    </PageLayout>
  );
}

export default memo(Main);
