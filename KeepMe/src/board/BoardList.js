import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BoardList.module.css';
import axios from 'axios';
import BoardDetail from './BoardDetail';
export default function BoardList() {
  const navigate = useNavigate();
  const [dataBoard, setDataBoard] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const response = (await axios.get(`${url}boards`, {
          params: {
            size: 1000, // 한 번에 충분히 많은 게시물을 가져오기
          },
          headers: { 'Authorization': sessionStorage.getItem('token') }
        })).data;
        setDataBoard(response.content); // 가져온 데이터를 상태에 저장
        console.log(response);
      } catch (error) {
        console.log('Error fetching posts:', error);
      }
    }
    loadBoard();
  }, [url]);

  const handleRowClick = (idx) => {
    setSelectedPostId(idx); // 선택된 게시글 저장
    console.log('post', idx);
    setIsDetail(true); // 디테일 모달 열기
  };
const onClose = () => {
  setIsDetail(false);
  setSelectedPostId(null);
}
  return (
      <div className={styles.bg} >
        <h3 className={styles.h3Board}>공지사항</h3>
        <div className={styles.boardContainer}>
          <table className={styles.boardTable}>
            <tbody>
              {dataBoard.map((post) => (
                <tr key={post.idx} onClick={() => handleRowClick(post.idx)}>
                  <td>{post.idx}</td>
                  <td>{post.title}</td>
                  <td>{new Date(post.createDate).toLocaleDateString('ko-KR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
           {/* 선택된 게시글이 있을 때만 BoardDetail 모달을 보여줌 */}
        {isDetail && selectedPostId && <BoardDetail postId={selectedPostId} onClose={onClose} />}
        </div>
      </div>
    
  );
}
