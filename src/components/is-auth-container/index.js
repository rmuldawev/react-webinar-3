import React from "react";
import PropTypes from "prop-types";

const IsAuthContainer = ({ isAuth, children }) => {
  if (isAuth) {
    return <div>{children}</div>;
  } else {
    return children;
  }
};

IsAuthContainer.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

IsAuthContainer.defaultProps = {};

export default React.memo(IsAuthContainer);
