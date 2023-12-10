import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavBar = ({ lang }) => {
  return (
    <Link style={{ color: "#0087E9" }} to={"/"}>
      {lang ? "Home" : "Главная"}
    </Link>
  );
};

NavBar.propTypes = {
  lang: PropTypes.bool.isRequired,
};

export default React.memo(NavBar);
