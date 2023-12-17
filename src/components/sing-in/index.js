import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../sing-in/styles.css";

const UserHeader = ({ title, isAuth, onClick, user }) => {
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
          <Link to={"/login"}>
            <button className="buttonStyle">{title}</button>
          </Link>
        </>
      )}
    </div>
  );
};

UserHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isAuth: PropTypes.bool,
  onClick: PropTypes.func,
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default React.memo(UserHeader);
