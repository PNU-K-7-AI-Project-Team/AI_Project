import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './BoardMain.module.css'
import Pagination from '../pagination/Pagination'
import axios from 'axios';

export default function BoardMain() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataBoard, setDataBoard] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 10;
  // 현재 페이지의 게시글 가져오기
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const url = process.env.REACT_APP_BACKEND_URL;
  const handleWrite = () => {
    window.location.href = '/boardwrite';
  }
  useEffect(() => {
    // loadBoard 함수: 게시판 데이터를 비동기로 가져오는 함수
    const loadBoard = async () => {
      try {
        // 백엔드 API 호출: 현재 페이지 번호와 게시글 수에 따라 게시글 데이터를 가져옴
        const response = await axios.get(`${url}boards`);

        // 서버 응답에서 데이터와 총 게시글 수 추출
        const { data, total } = response.data;
        console.log(data);
        // 가져온 데이터를 상태로 설정
        setDataBoard(data);
        setTotalPosts(total);
      } catch (error) {
        // 오류가 발생하면 콘솔에 에러 메시지 출력
        console.error('Error fetching posts:', error);
      }
    };
    // 컴포넌트가 렌더링될 때와 currentPage 또는 url이 변경될 때마다 loadBoard 함수 호출
    loadBoard();
  }, [currentPage, url]); // currentPage와 url이 변경될 때마다 effect 실행


  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.bg}>
      <h3 className={styles.text}>공지사항</h3>
      <div className={styles.boardContainer}>
        <table className={styles.boardTable}>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>부서</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {dataBoard.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td><Link to={`/boarddetail/${post.id}`}>{post.title}</Link></td>
                <td>{post.department}</td>
                <td>{post.author}</td>
                <td>{post.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleWrite} className={styles.writeButton}>작성</button>
        <div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPosts}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>


  )
}
