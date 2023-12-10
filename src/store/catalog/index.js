import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      aboutProduct: null,
      currentPage: 1,
      totalCount: 0,
    };
  }

  async load(limit, skip) {
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`
    );
    const json = await response.json();

    const totalPages = Math.ceil(json.result.count / limit);
    const currentPage = Math.ceil((skip + 1) / limit);

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalCount: json.result.count,
        currentPage,
        totalPages,
      },
      "Загружены товары из АПИ"
    );
  }
}

export default Catalog;
