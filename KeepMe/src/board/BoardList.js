import React from 'react'
import { Link } from 'react-router-dom'
import styles from './BoardList.module.css'
import Pagination from '../pagination/Pagination'
import axios from 'axios'; 
import { useState, useEffect } from 'react';
export default function BoardList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataBoard, setDataBoard] = useState([]);
  const [postsPerPage] = useState(5); 
  const [page, setPage] = useState({
    size: 5,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  })
  const url = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const loadBoard = async () => {
      try {
        const response = (await axios.get(`${url}boards`,{
          params: {
            page: currentPage - 1,
            size: postsPerPage,
          }
        })).data;
        setDataBoard(response.content);
        setPage({
          size: response.page.size,
            number: response.page.number,
            totalElements: response.page.totalElements,
            totalPages: response.page.totalPages,
        })
        console.log(response);
      } catch (error) {
        console.log('Error fetching posts:', error);
      }
    }
    loadBoard();
  }, [currentPage, url, postsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className={styles.bg}>
      <h3>공지사항</h3>
      <div className={styles.boardContainer}>
        <table className={styles.boardTable}>
          <tbody>
            {dataBoard.map((post) => (
              <tr key={post.idx}>
                <td>{post.idx}</td>
                <td>
                  <Link to={`/boarddetail/${post.idx}`}>{post.title}</Link>
                </td>
                <td>{post.createDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.paginationContainer}>
        <Pagination
            postsPerPage={postsPerPage}
            totalPosts={page.totalElements}
            paginate={paginate}
            currentPage={currentPage}
            totalPages={page.totalPages}
          />

        </div>
      </div>
    </div>
  )
}