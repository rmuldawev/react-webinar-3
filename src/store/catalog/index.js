import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      aboutProduct: null
    }
  }

  async loadAboutProduct (id) {
    const res = await fetch(`/api/v1/articles/${id}`);
    console.log('res', res)
    const json = await res.json();
    console.log('json', json.result)

    this.setState({
      ...this.getState(),
      aboutProduct: json.result.items
    },'Данные о товаре загружены')
  }

  // async loadAboutProduct(id) {
  //   try {
  //     const res = await fetch(`/api/v1/articles/${id}`);
  //     const json = await res.json();

  //     this.setState({
  //       ...this.getState(),
  //       aboutProduct: json.result.items.length > 0 ? json.result.items[0] : null,
  //     }, 'Данные о товаре загружены');
  //   } catch (error) {
  //     console.error('Ошибка при загрузке данных о товаре:', error);
  //   }
  // }

  async load(limit, skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalCount: json.result.count,
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;

