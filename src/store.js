/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.usedCodes = new Set(this.state.list.map((item) => item.code));
    this.nextCode = this.calculateNextCode();

    this.state = {
      ...initState,
      list: initState.list.map(item => ({ ...item, selectionCount: 0 })),
    };
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
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
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

  /**
   * Добавление новой записи
   */
  calculateNextCode() {
    let maxCode = Math.max(...this.usedCodes, 0);
    return maxCode + 1;
  }

  generateUniqueCode() {
    const newCode = this.nextCode;
    this.nextCode++;
    return newCode;
  }

  addItem() {
    const newCode = this.generateUniqueCode();
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: "Новая запись" }],
    });
    this.usedCodes.add(newCode);
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.usedCodes.delete(code);
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    const selectState = this.state.list.map((item) => {
      if (item.code === code) {
        item.selected = !item.selected;
        if (item.selected) {
          item.selectionCount += 1;
        }
      } else {
        item.selected = false;
      }
      return item;
    });
  
    this.setState({
      ...this.state,
      list: selectState,
    });
  }
}

export default Store;
