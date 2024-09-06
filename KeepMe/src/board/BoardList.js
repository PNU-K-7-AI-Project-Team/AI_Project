import React from 'react'
import { Link } from 'react-router-dom'
import styles from './BoardList.module.css'
import Pagination from '../pagination/Pagination'
import axios from 'axios'; 
import { useState, useEffect } from 'react';
export default function BoardList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataBoard, setDataBoard] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 10;
  const url = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const loadBoard = async () => {
      try {
        const response = await axios.get(`${url}/boards?page=${currentPage}&limit=${postsPerPage}`);
        const { data, total } = response.data;
        setDataBoard(data);
        setTotalPosts(total);
      } catch (error) {
        console.log('Error fetching posts:', error);
      }
    }
    loadBoard();
  }, [currentPage, url]);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className={styles.bg}>
      <h3>공지사항</h3>
      <div className={styles.boardContainer}>
        <table className={styles.boardTable}>
          <tbody>
            {dataBoard.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                  <Link to={`/boarddetail/${post.id}`}>{post.title}</Link>
                </td>
                <td>{post.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination 
          postsPerPage={postsPerPage} 
          totalPosts={totalPosts} 
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}