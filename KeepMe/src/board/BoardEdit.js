import React from 'react'
import styles from './BoardEdit.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
export default function BoardEdit() {
  const { idx } = useParams();
  // const [title, setTitle] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [userName, setUserName] = useState('');
  const [dept, setDept] = useState('');
  // const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BACKEND_URL;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem('token')
  };

  useEffect(() => { 
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${url}board?idx=${idx}`,{headers:headers});
        const post = response.data;
        setEditedTitle(post.title);
        setEditedContent(post.content);
        setUserName(post.userName)
        setDept(post.dept)
      } catch (error) {
        console.error('Error fetching the post:', error);
      }
    }
    fetchPost();
  }, [idx, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 게시글 제출 로직을 구현합니다.
    if (editedTitle.trim() === '' || editedContent.trim() === '') {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }
    try {
      await axios.post(`${url}board/edit?idx=${idx}`,
        {
          title: editedTitle, content: editedContent
        }, { headers: headers }
      );
      alert("성공적으로 게시글을 수정하였습니다.");
      navigate("/board");
    } catch (error) {
      if(error.response.status===401){
        console.error('Error deleting the post:', error);
        alert('권한이 없는 사용자입니다.');
        navigate('/board');
      }else{
        console.error('Error deleting the post:', error);
        alert('알 수 없는 오류가 발생했습니다.');

      }
    }
    // console.log({ title, userName, dept, content });
    // 제출 후 게시판 목록 페이지로 이동
    navigate('/board');
  };

  const handleCancel = () => {
    navigate('/board');
  };
  return (
    <div className={styles.bg}>
      <h3 className={styles.text}>게시글 수정</h3>
      <div className={styles.boardWriteContainer}>
        <form onSubmit={handleSubmit}>
          {/* {error && <p className={styles.error}>{error}</p>} */}
          <div className={styles.postWriteContainer}>
            <label htmlFor="title" className={styles.title}>제목</label>
            <input className={styles.writeTitle}
              type="text"
              id="title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
            />
            <div className={styles.writeEtcContainer}>
              <label htmlFor="dept">부서: {dept}</label>
              <label htmlFor="userName">작성자: {userName}</label>
            </div>
          </div>
          <div>
            <textarea
              id="content"
              className={styles.writeContent}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit" className={styles.submitButton} >확인</button>
            <button type="button" onClick={handleCancel} className={styles.cancelButton}>취소</button>
          </div>
        </form>
      </div>
    </div>
  )
}
