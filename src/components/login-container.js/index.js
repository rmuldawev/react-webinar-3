import { useForm } from "react-hook-form";
import CustomInput from "../input-field";
import { Link } from "react-router-dom";

const LoginContainer = ({ onLogin }) => {
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    const { login, password } = data;

    if (onLogin) {
      try {
        await onLogin(login, password);
      } catch (error) {
        console.error("Ошибка ", error);
      }
    }
  };

  return (
    <div style={{ paddingLeft: "20px" }}>
      <h1>Вход</h1>
      <CustomInput name={"login"} title={"Логин"} control={control} />
      <CustomInput name={"password"} title={"Пароль"} control={control} />
      {/* <Link to='/profile'> */}
        <button style={{ marginTop: "1px" }} onClick={handleSubmit(onSubmit)}>
          Войти
        </button>
      {/* </Link> */}

    </div>
  );
};

export default LoginContainer;
