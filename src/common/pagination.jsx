import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// recieve props ==>(itemsCount,pageSize,currentPage,onPageChange)

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  //calculate how many pages do we need, and using Math.ceil to conver every floating number to an integer (0.9 =>1)
  const pagesCount = Math.ceil(itemsCount / pageSize);

  // exit if the pages is just a one
  if (pagesCount === 1) return null;

  //using lodash to range pageCount as an array ex=> 3pages ranged to[1,2,3,]
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
