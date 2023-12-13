import { useForm } from "react-hook-form";
import CustomInput from "../input-field";

const LoginContainer = ({ onLogin }) => {
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    const { login, password } = data;
    console.log("login", login);
    console.log("password", password);

    if (onLogin) {
      try {
        await onLogin(login, password);
        // Дополнительные действия после успешного входа
      } catch (error) {
        console.error("Ошибка при входе:", error);
        // Обработка ошибки входа
      }
    }
  };

  return (
    <div style={{ paddingLeft: "20px" }}>
      <h1>Вход</h1>
      <CustomInput name={"login"} title={"Логин"} control={control} />
      <CustomInput name={"password"} title={"Пароль"} control={control}  />
      <button style={{ marginTop: "1px" }} onClick={handleSubmit(onSubmit)}>
        Войти
      </button>
    </div>
  );
};

export default LoginContainer;
