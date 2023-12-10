import React from "react";
import '../spiner/styles.css'

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default React.memo(Spinner);