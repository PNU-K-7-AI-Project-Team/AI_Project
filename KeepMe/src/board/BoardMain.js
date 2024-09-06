import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './BoardMain.module.css'
import Pagination from '../pagination/Pagination'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function BoardMain() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataBoard, setDataBoard] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage] = useState(10);
  const [page, setPage] = useState({
    size: 10,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  })
  const navigate = useNavigate();
  // 현재 페이지의 게시글 가져오기

  const url = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    // loadBoard 함수: 게시판 데이터를 비동기로 가져오는 함수
    const loadBoard = async () => {
      try {
        // 백엔드 API 호출: 현재 페이지 번호와 게시글 수에 따라 게시글 데이터를 가져옴
        const response = (await axios.get(`${url}boards`,{
          params: {
            page: currentPage - 1,
            size: postsPerPage,
          }
        })).data;
        setDataBoard(response.content);
        console.log("response.content", response.content);
        console.log("dataBoard", dataBoard);
        setPage({
          size: response.page.size,
            number: response.page.number,
            totalElements: response.page.totalElements,
            totalPages: response.page.totalPages,
        })
        console.log(response);
      } catch (error) {
        // 오류가 발생하면 콘솔에 에러 메시지 출력
        console.error('Error fetching posts:', error);
      }
    };
    // 컴포넌트가 렌더링될 때와 currentPage 또는 url이 변경될 때마다 loadBoard 함수 호출
    loadBoard();
  }, [currentPage, url]); // currentPage와 url이 변경될 때마다 effect 실행

  
  
  const handleWrite = () => {
    navigate('/boardwrite');
  }

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => {setCurrentPage(pageNumber);}

  const dept = {
    HR: '인사',
    IT: '전산관리',
    QM: '품질관리',
  };

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
              <tr key={post.idx}>
                <td>{post.idx}</td>
                <td><Link to={`/boardDetail/${post.idx}`}>{post.title}</Link></td>
                <td>{dept[post.dept]}</td> 
                <td>{post.userName}</td>
                <td>{post.createDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleWrite} className={styles.writeButton}>작성</button>
         {/* 페이지네이션 컴포넌트 */}
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
