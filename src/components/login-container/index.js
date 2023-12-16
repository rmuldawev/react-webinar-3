import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import CustomInput from "../input-field/index.js";
import "../login-container/styles.css";

const LoginContainer = ({ onLogin, error }) => {
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
      {error && <p className="errorMessage">{error.message}</p>}
      <CustomInput name={"login"} title={"Логин"} control={control} />
      <CustomInput name={"password"} title={"Пароль"} control={control} />
      <button style={{ marginTop: "1px" }} onClick={handleSubmit(onSubmit)}>
        Войти
      </button>
    </div>
  );
};

LoginContainer.propTypes = {
  onLogin: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
};

export default React.memo(LoginContainer);
