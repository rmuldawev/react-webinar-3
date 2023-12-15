import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        sort: "order",
        query: "",
        category: "All",
      },
      count: 0,
      waiting: false,
      categories: [],
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    const res = await fetchCategories().then((response) => {
      return response.result.items;
    });
    const categories = [
      { title: "Все", value: "All", parent: null },
      ...res.map((e) => {
        return { title: e.title, value: e._id, parent: e.parent };
      }),
    ];
    console.log(categories);

    function buildSortedHierarchyWithDashes(
      data,
      parentValue = null,
      prefix = ""
    ) {
      const result = [];

      for (const item of data) {
        const parentId = item.parent ? item.parent._id : null;
        if (parentId === parentValue) {
          const children = buildSortedHierarchyWithDashes(
            data,
            item.value,
            prefix + "-"
          );
          if (children.length > 0) {
            item.children = children;
          }
          item.title = prefix + item.title;
          result.push(item);
        }
      }

      return result.sort((a, b) => a.value - b.value);
    }

    // Используем функцию для построения отсортированной иерархии и добавления "-"
    const sortedHierarchyWithDashes =
      buildSortedHierarchyWithDashes(categories);

    // Преобразовать результат в первоначальный массив
    const transformedArray = [];
    const traverse = (item) => {
      transformedArray.push({ ...item, children: undefined }); // Копируем объект, убирая поле "children"
      if (item.children) {
        for (const child of item.children) {
          traverse(child);
        }
      }
    };

    for (const item of sortedHierarchyWithDashes) {
      traverse(item);
    }

    console.log("transformedArray", transformedArray);

    // console.log("categories", categories);
    this.setState({ ...this.getState(), categories: transformedArray });
    let validParams = {};
    if (urlParams.has("page"))
      validParams.page = Number(urlParams.get("page")) || 1;
    if (urlParams.has("limit"))
      validParams.limit = Math.min(Number(urlParams.get("limit")) || 10, 50);
    if (urlParams.has("sort")) validParams.sort = urlParams.get("sort");
    if (urlParams.has("query")) validParams.query = urlParams.get("query");
    if (urlParams.has("category"))
      validParams.category = urlParams.get("category");

    await this.setParams(
      { ...this.initState().params, ...validParams, ...newParams },
      true
    );
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = { ...this.getState().params, ...newParams };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      "Установлены параметры каталога"
    );

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    const url =
      window.location.pathname + "?" + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: "items(*),count",
      sort: params.sort,
      "search[query]": params.query,
    };
    if (params.category !== "All") {
      apiParams["search[category]"] = params.category;
    }

    const response = await fetch(
      `/api/v1/articles?${new URLSearchParams(apiParams)}`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        waiting: false,
      },
      "Загружен список товаров из АПИ"
    );
  }
}

export default CatalogState;

export const fetchCategories = async () => {
  try {
    const response = await fetch(
      "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return data; // Assuming the response contains the list of categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
