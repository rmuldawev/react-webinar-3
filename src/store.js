import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      cart: [], // New property for the shopping cart
      ...initState,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }


  addToCart(code, count) {
    const { cart, list } = this.state;
    const existingItem = cart.find(item => item.code === code);
  
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.code === code ? { ...item, count: item.count + count } : item
      );
  
      this.setState({
        ...this.state,
        cart: updatedCart,
      });
    } else {
      const selectedItem = list.find((item) => item.code === code);
      if (selectedItem) {
        this.setState({
          ...this.state,
          cart: [...cart, { ...selectedItem, count }],
        });
      }
    }
  }

  removeFromCart(code) {
    const updatedCart = this.state.cart.filter((item) => item.code !== code);
    this.setState({
      ...this.state,
      cart: updatedCart,
    });
  }
}

export default Store;
