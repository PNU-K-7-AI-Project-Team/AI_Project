import React from 'react'
import { useState, useEffect } from 'react'
import styles from './BoardMain.module.css'
import Pagination from '../pagination/Pagination'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BoardWrite from './BoardWrite';
import BoardDetail from './BoardDetail';

export default function BoardMain({ onClose }) {
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentBoardPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [dataBoard, setDataBoard] = useState([]);
  const [postsPerPage] = useState(10);
  const [page, setPage] = useState({
    size: 10,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });
  const [selectedPostId, setSelectedPostId] = useState(null); // 선택된 게시글 저장
  const [isDetail, setIsDetail] = useState(false);
  const [isWrite, setIsWrite] = useState(false);
  

  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const response = (await axios.get(`${url}boards`, {
          params: {
            page: currentPage - 1,
            size: postsPerPage,
          },
          headers: { 'Authorization': sessionStorage.getItem('token') }
        })).data;
        setDataBoard(response.content);
        setPage({
          size: response.page.size,
          number: response.page.number,
          totalElements: response.page.totalElements,
          totalPages: response.page.totalPages,
        });
        console.log(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    loadBoard();
    localStorage.setItem('currentBoardPage', currentPage.toString());
  }, [currentPage, url, postsPerPage]);

  const handleWrite = (e) => {
    e.preventDefault();
    setIsWrite(true);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentBoardPage', pageNumber.toString());
  };

  const dept = {
    HR: '인사',
    IT: '전산관리',
    QM: '품질관리',
  };

  const handleRowClick = (idx) => {
    setSelectedPostId(idx); // 선택된 게시글 저장
    console.log('post', idx);
    setIsDetail(true); // 디테일 모달 열기
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.boardMain} onClick={e => e.stopPropagation()}>
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
              <tr key={post.idx} onClick={() => handleRowClick(post.idx)}>
                <td>{post.idx}</td>
                <td>{post.title}</td>
                <td>{dept[post.dept]}</td>
                <td>{post.userName}</td>
                <td className={styles.createDate}>{new Date(post.createDate).toLocaleDateString('ko-KR')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 선택된 게시글이 있을 때만 BoardDetail 모달을 보여줌 */}
        {isDetail && selectedPostId && <BoardDetail postId={selectedPostId}  onClose={onClose}/>}

        <button onClick={handleWrite} className={styles.writeButton}>작성</button>
        {isWrite && <BoardWrite onClose={onClose} />}
        <button onClick={onClose} className={styles.homeButton}>닫기</button>

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
  );
}
