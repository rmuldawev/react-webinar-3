import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const activeModal = useSelector((state) => state.modals.name);
  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    token: state.user.token,
    user: state.user.user,
  }));
  console.log("authdasdasdasdasd", select.isAuth);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        await store.actions.user.getUserInfo(token);
      }
    };

    fetchUserInfo();
  }, [store.actions.user, select.token]);

  return (
    <>
      <Routes>
        <>
          <Route path={""} element={<Main />} />
          <Route path={"/articles/:id"} element={<Article />} />
          <Route path={"/login"} element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </>
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
