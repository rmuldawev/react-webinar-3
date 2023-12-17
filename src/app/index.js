import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import IsAuthContainer from "../components/is-auth-container/index.js";
import { useDelay } from "../utils.js";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const activeModal = useSelector((state) => state.modals.name);

  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
  }));
  console.log('select.isAuth',select.isAuth)

  useEffect(() => {
    store.actions.user.autoLogin();
  }, [store]);

  return (
    <>
      <Routes>
        <>
          <Route path={""} element={<Main />} />
          <Route path={"/articles/:id"} element={<Article />} />
          <Route path={"/login"} element={<Login />} />

          <Route
            path={"/profile"}
            element={
              select.isAuth ? (
                <IsAuthContainer isAuth={select.isAuth}>
                  <Profile />
                </IsAuthContainer>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </>
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
