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
      {/* {error && <p className="errorMessage">{error}</p>} */}
      <div style={{marginBottom:20}}>

      <CustomInput name={"login"} title={"Логин"} control={control} />
      </div>

      <CustomInput name={"password"} title={"Пароль"} control={control} />
      {error && <p className="errorMessage">{error}</p>}

      <button style={{ marginTop: "20px" }} onClick={handleSubmit(onSubmit)}>
        Войти
      </button>
    </div>
  );
};

LoginContainer.propTypes = {
  onLogin: PropTypes.func.isRequired,
  error: PropTypes.string, // Изменили PropTypes
};

export default React.memo(LoginContainer);
