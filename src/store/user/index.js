import StoreModule from "../module";

class UserAuth extends StoreModule {
  initState() {
    return {
      isAuth: null,
      token: null,
      authError: null,
      user: null,
    };
  }

  async login(login, password) {
    const response = await fetch("/api/v1/users/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
        remember: true,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      this.setState(
        {
          isAuth: true,
          user: data.result.user,
          token: data.result.token,
        },
        "Авторизация успешна"
      );

      if (data.result.token) {
        localStorage.setItem("accessToken", data.result.token);
      }
    } else {
      const errorData = await response.json();
      console.log(errorData);
      this.setState({
        authError:
          errorData.error.data.issues[0].message || "Ошибка авторизации",
      });
      throw new Error("Ошибка авторизации");
    }
  }

  getAuthError() {
    return this.getState().authError;
  }

  async logout() {
    const token = localStorage.getItem("accessToken");
    try {
      if (!token) {
        console.warn("Токен равен null. Возможно, он уже был удален.");
        return;
      }

      const response = await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("accessToken");
        this.setState(
          {
            isAuth: false,
            user: null,
          },
          "Выход успешен"
        );
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка при выходе");
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error.message);
      throw new Error("Ошибка при выходе");
    }
  }

  async autoLogin() {
    const token = localStorage.getItem("accessToken");

    if (token === null) {
      return;
    }

    const response = await fetch(`/api/v1/users/self`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-Token": token,
      },
    });

    const res = await response.json();
    console.log("dsdsd", res);

    this.setState({
      isAuth: true,
      user: res.result,
    });
  }
}

export default UserAuth;
