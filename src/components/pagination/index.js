import React from "react";
import PropTypes from "prop-types";
import "../pagination/styles.css";
import { createPaginationPages } from "../../utils";

const Pagination = ({ catalogState, updatePagination }) => {
  const { totalPages, currentPage } = catalogState;
  const { pages, currentIndex } = createPaginationPages(
    currentPage,
    totalPages
  );

  const handlePageClick = (page) => {
    if (typeof page === "number") {
      updatePagination(catalogState.limit, (page - 1) * catalogState.limit);
    }
  };

  return (
    <div className="container">
      {pages?.map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          className={
            index === currentIndex
              ? "pagination_active_button"
              : "pagination-button"
          }
        >
          {page}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  catalogState: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
  }).isRequired,
  updatePagination: PropTypes.func.isRequired,
};

export default React.memo(Pagination);
