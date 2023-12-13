import StoreModule from "../module";

class UserAuthState extends StoreModule {
  initState() {
    return {
      isAuthenticated: false,
      token: null,
      user: null,
      error: null,
    };
  }

  /**
   * Авторизация пользователя
   * @param {string} login
   * @param {string} password
   */
  async load(currentState) {
    try {
      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "X-Token": currentState.token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const user = await response.json();
        this.setState({ ...currentState, user, error: null });
      } else {
        const error = await response.json();
        this.setState({
          ...currentState,
          isAuthenticated: false,
          token: null,
          user: null,
          error,
        });
      }
    } catch (error) {
      console.error("Ошибка при загрузке профиля:", error);
      this.setState({
        ...currentState,
        isAuthenticated: false,
        token: null,
        user: null,
        error,
      });
    }
  }


  
  /**
   * Выход - отмена авторизации для удаления токена
   */
  async logout() {
    const currentState = this.getState(); // Получаем текущее состояние
    // Дополнительные действия при выходе, например, очистка данных пользователя
    this.setState({
      ...currentState,
      isAuthenticated: false,
      token: null,
      user: null,
    });
  }

  /**
   * Загрузка профиля пользователя
   */
  async loadUserProfile() {
    try {
      const currentState = this.getState(); // Получаем текущее состояние

      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "X-Token": currentState.token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const user = await response.json();
        this.setState({ ...currentState, user, error: null });
      } else {
        const error = await response.json();
        this.setState({
          ...currentState,
          isAuthenticated: false,
          token: null,
          user: null,
          error,
        });
      }
    } catch (error) {
      console.error("Ошибка при загрузке профиля:", error);
      const currentState = this.getState(); // Получаем текущее состояние
      this.setState({
        ...currentState,
        isAuthenticated: false,
        token: null,
        user: null,
        error,
      });
    }
  }
}

export default UserAuthState;
