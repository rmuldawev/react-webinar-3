import React from "react";
import { Link } from "react-router-dom";
import "../sing-in/styles.css";

const UserHeader = ({ title, isAuth, onClick, user }) => {
  console.log("singinAuth", isAuth);

  return (
    <div className="userContainer">
      {isAuth ? (
        <>
          {user && (
            <Link to={"/profile"}>
              <p className="userNameText">{user.profile.name}</p>
            </Link>
          )}
          <Link to={"/"}>
            <button onClick={onClick} className="buttonStyle">
              Выход
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link to={"/singin"}>
            <button className="buttonStyle">{title}</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default React.memo(UserHeader);
