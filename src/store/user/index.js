import StoreModule from "../module";
import { useNavigate } from "react-router-dom";

class UserAuth extends StoreModule {
  initState() {
    return {
      isAuth: false,
      // token: null,
      user: null,
    };
  }

  async getUserInfo(token) {
    try {
      if (!token) {
        throw new Error("Токен отсутствует");
      }

      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("userData", userData.result);
        this.setState({
          user: userData.result,
          isAuth:true
        });
      } else {
        const errorData = await response.json();
        console.error(
          "Ошибка при получении данных пользователя:",
          errorData.message
        );
        throw new Error(
          errorData.message || "Ошибка при получении данных пользователя"
        );
      }
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error.message);
      throw new Error("Ошибка при получении данных пользователя");
    }
  }

  async login(login, password) {
    try {
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
      console.log('response',response)
      if (response.ok) {
        const data = await response.json();
        console.log('data',data)
        this.setState(
          {
            isAuth: true,
            // token: data.result.token,
            user: data.result.user,
          },
          "Авторизация успешна"
        );
        if (data.result.token) {
          
          localStorage.setItem("accessToken", data.result.token);
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка авторизации");
      }
    } catch (error) {
      console.error("Ошибка в процессе авторизации:", error.message);
      throw new Error("Ошибка в процессе авторизации");
    }
  }



  async logout(token) {
    try {
      // const token = this.state.token;

      if (!token) {
        throw new Error("Токен отсутствует");
      }

      const response = await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        this.setState(
          {
            ...this.getState(),
            isAuth: false,
            user: null,
          },
          "Выход успешен"
        );
        localStorage.removeItem("accessToken");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка при выходе");
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error.message);
      throw new Error("Ошибка при выходе");
    }
  }
}

export default UserAuth;
