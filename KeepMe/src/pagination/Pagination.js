// Pagination.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Pagination.module.css';

export default function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // 페이지 번호 배열 생성
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 표시할 페이지 번호 범위 계산
  const pageRange = 5; // 한 번에 표시할 페이지 번호 개수
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  return (
    <nav className={styles.paginationContainer}>
      <ul className={styles.pagination}>
        {/* 이전 페이지 버튼 */}
        <li>
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1} 
            className={styles.paginationButton}
          >
            이전
          </button>
        </li>

        {/* 페이지 번호 */}
        {pageNumbers.slice(startPage - 1, endPage).map(number => (
          <li key={number} className="page-item">
            <button 
              onClick={() => paginate(number)} 
              className={`${styles.pagelink} ${currentPage === number ? styles.active : ''}`}
            >
              {number}
            </button>
          </li>
        ))}

        {/* 다음 페이지 버튼 */}
        <li>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages} 
            className={styles.paginationButton}
          >
            다음
          </button>
        </li>
      </ul>
    </nav>
  );
}