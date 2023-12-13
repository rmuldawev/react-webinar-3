import { FormProvider, useForm } from "react-hook-form";
import Head from "../../components/head";
import LoginContainer from "../../components/login-container.js";
import PageLayout from "../../components/page-layout";
import SingIn from "../../components/sing-in";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import UserAuthState from "../../store/user/index.js";

const Login = () => {
    const userAuthState = new UserAuthState();
  const { t } = useTranslate();

  const methods = useForm({
        // resolver: yupResolver(validationSchema),
        mode: 'onChange',
      });
      const {
        formState: {isValid, errors},
        getValues,
      } = methods;

      const handleLogin = async (login, password) => {
        try {
          // Вызовите функцию логина из вашего экземпляра UserAuthState
          await userAuthState.login(login, password);
          // Дополнительные действия после успешного входа
        } catch (error) {
          console.error("Ошибка при входе:", error);
          // Обработка ошибки входа
        }
      };

  return (
    <FormProvider {...methods}>

    <PageLayout>
      <SingIn title={t("Вход")}/>
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
