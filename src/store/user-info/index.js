import StoreModule from "../module";

class UserInfo extends StoreModule {
  initState() {
    return {
      user: null,
      isAuth: null,
    };
  }

  async fetchUserInfo() {
    const token = localStorage.getItem("accessToken");
    const response = await fetch("/api/v1/users/self?fields=*", {
      method: "GET",
      headers: {
        "X-Token": token,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const userData = await response.json();
      this.setState({
        user: userData.result,
        isAuth: true,
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
  }
}

export default UserInfo;
