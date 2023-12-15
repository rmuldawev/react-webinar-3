import { FormProvider, useForm } from "react-hook-form";
import Head from "../../components/head";
import LoginContainer from "../../components/login-container.js";
import PageLayout from "../../components/page-layout";
import SingIn from "../../components/sing-in";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store.js";
import useSelector from "../../hooks/use-selector.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const store = useStore();
  const { t } = useTranslate();
  const auth = localStorage.getItem("accessToken");

  const methods = useForm({
    mode: "onChange",
  });

  // const {
  //   formState: { isValid, errors },
  //   getValues,
  // } = methods;

  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    token: state.user.token,
    user: state.user.user,
  }));

  const handleLogin = async (login, password) => {
    try {
      await store.actions.user.login(login, password);
      navigate("/profile");
    } catch (error) {
      console.error("Ошибка авторизации", error);
    }
  };

  const handleLogout = async () => {
    try {
      await store.actions.user.logout(auth);
    } catch (error) {
      console.error("Ошибка при удалении токена:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <PageLayout>
        <SingIn
          title={t("Вход")}
          isAuth={auth}
          user={select.user}
          onClick={handleLogout}
        />
        <Head title={t("title")}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <LoginContainer onLogin={handleLogin} />
      </PageLayout>
    </FormProvider>
  );
};

export default Login;
