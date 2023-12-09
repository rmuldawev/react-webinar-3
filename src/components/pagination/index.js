import React from "react";
import PropTypes from "prop-types";
import "../pagination/styles.css";

const Pagination = ({ totalCount, pagination, updatePagination }) => {
  const totalPages = Math.ceil(totalCount / pagination.limit);
  const currentPage = Math.ceil((pagination.skip + 1) / pagination.limit);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    const isCurrentPage = i === currentPage;
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(
        <button
          key={i}
          onClick={() => updatePagination(10, (i - 1) * 10)}
          className={
            isCurrentPage ? "pagination_active_button" : "pagination-button"
          }
        >
          {i}
        </button>
      );
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pages.push(
        <span key={i} style={{ color: "#CCCCCC" }}>
          ...
        </span>
      );
    }
  }

  return <div className="container">{pages}</div>;
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  pagination: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
  }).isRequired,
  updatePagination: PropTypes.func.isRequired,
};

export default React.memo(Pagination);
