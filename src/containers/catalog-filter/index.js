import { memo, useCallback, useEffect, useMemo, useState } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import { fetchCategories } from "../../store/catalog";

/**
 * Контейнер со всеми фильтрами каталога
 */
const data = [
  {
      "_id": "0",
      "parent": null,
      "title": "All"
  }, {
      "_id": "61c0a9cb8f67e811d55abb2d",
      "parent": null,
      "title": "Electronics"
  }, {
      "_id": "61c0a9cb8f67e811d55abb2e",
      "parent": { "_id": "61c0a9cb8f67e811d55abb2d" },
      "title": "Phones"
  }, {
      "_id": "61c0a9cb8f67e811d55abb2f",
      "parent": { "_id": "61c0a9cb8f67e811d55abb2d" },
      "title": "Laptops"
  }, {
      "_id": "61c0a9cb8f67e811d55abb30",
      "parent": { "_id": "61c0a9cb8f67e811d55abb2d" },
      "title": "TVs"
  }, {
      "_id": "61c0a9cb8f67e811d55abb31",
      "parent": null,
      "title": "Literature"
  }, {
      "_id": "61c0a9cb8f67e811d55abb32",
      "parent": { "_id": "61c0a9cb8f67e811d55abb31"},
      "title": "Study Literature"
  }, {
      "_id": "61c0a9cb8f67e811d55abb33",
      "parent": { "_id": "61c0a9cb8f67e811d55abb31" },
      "title": "Fictional Literature"
  }, {
      "_id": "61c0a9cb8f67e811d55abb34",
      "parent": { "_id": "61c0a9cb8f67e811d55abb31" },
      "title": "Comic books"
  }, {
      "_id": "61c0a9cb8f67e811d55abb35",
      "parent": { "_id": "61c0a9cb8f67e811d55abb2e" },
      "title": "Smartphones"
  }, {
      "_id": "61c0a9cb8f67e811d55abb36",
      "parent": { "_id": "61c0a9cb8f67e811d55abb35" },
      "title": "Accessories"
  }
];
function CatalogFilter() {
  const [categories, setCategories] = useState([]);

  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.catalog.categories,
  }));
  console.log("categories", select.categories);

  const createLinkedList = (items) => {
    const linkedList = {};
  
    items.forEach((item) => {
      if (item.parent) {
        if (!linkedList[item.parent.value]) {
          linkedList[item.parent.value] = [];
        }
        linkedList[item.parent.value].push(item);
      } else {
        linkedList[item.value] = item;
      }
    });
  
    return linkedList;
  };

  const modifyTitles = (linkedList, parentId = null) => {
    const items = linkedList[parentId] || [];
  
    return items.map((item) => {
      const newTitle = parentId ? `${parentId} - ${item.title}` : item.title;
      return {
        ...item,
        title: newTitle,
        children: modifyTitles(linkedList, item.value),
      };
    });
  };

  useEffect(() => {
    // Проверка на null и выполнение логики
    if (select.categories !== null) {
      const linkedList = createLinkedList(select.categories);
      const modifiedData = modifyTitles(linkedList);
      console.log('modifiedData', modifiedData);
    }
  }, [select.categories]);

// console.log('modifiedData', modifiedData);







  const callbacks = {
    // Категории
    onCategory: useCallback((category) => {
      store.actions.catalog.setParams({ category }, [store]);
    }),
    // Сортировка
    onSort: useCallback(
      (sort) => {
        store.actions.catalog.setParams({ sort });
      },
      [store]
    ),
    // Поиск
    onSearch: useCallback(
      (query) => store.actions.catalog.setParams({ query, page: 1 }),
      [store]
    ),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      []
    ),
  };
  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={select.categories}
        value={select.category}
        onChange={callbacks.onCategory}
      />
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={"Поиск"}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
