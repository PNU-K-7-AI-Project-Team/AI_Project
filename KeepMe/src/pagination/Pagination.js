import React from 'react';
import styles from './Pagination.module.css';
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
// postsPerPage (페이지당 게시물 수), totalPosts (전체 게시물 수), paginate (페이지 변경 함수).
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map(number => (
          <li key={number} className={styles.pageItem}>
            <a onClick={() => paginate(number)} href='!#' className={styles.pageLink}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
