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
    }
  }
}

export default UserInfo;
