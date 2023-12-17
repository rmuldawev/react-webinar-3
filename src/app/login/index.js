import { memo, useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store.js";
import useSelector from "../../hooks/use-selector.js";
import UserHeader from "../../components/sing-in/index.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginContainer from "../../components/login-container/index.js";

const Login = () => {
  const navigate = useNavigate();
  const store = useStore();
  const { t } = useTranslate();
  const [authError, setAuthError] = useState(null);

  const methods = useForm({
    mode: "onChange",
  });

  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    user: state.user.user,
    error: state.user.authError,
  }));
  console.log("select.isAuth", select.isAuth);

  const handleLogin = useCallback(
    async (login, password) => {
      try {
        await store.actions.user.login(login, password);
        navigate("/profile");
      } catch (error) {
        console.error("Ошибка авторизации", error);
        setAuthError(store.actions.user.getAuthError());
      }
    },
    [store.actions.user, navigate]
  );

  const handleLogout = useCallback(async () => {
    try {
      await store.actions.user.logout();
    } catch (error) {
      console.error("Ошибка при удалении токена:", error);
    }
  }, [store.actions.user]);

  useEffect(() => {
    if (select.isAuth === true) {
      navigate("/");
    }
  }, [select.isAuth]);

  return (
    <FormProvider {...methods}>
      <PageLayout>
        <UserHeader
          title={t("Вход")}
          isAuth={select.isAuth}
          user={select.user}
          onClick={handleLogout}
        />
        <Head title={t("title")}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <LoginContainer onLogin={handleLogin} error={authError} />
      </PageLayout>
    </FormProvider>
  );
};

export default memo(Login);
