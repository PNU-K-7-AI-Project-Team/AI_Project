import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BoardDetail.module.css';
import axios from 'axios';
export default function BoardDetail() {
    const { idx } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const url = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(`${url}board?idx=${idx}`);
            setPost(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching the post:', error);
          }
        };
        fetchPost();
      }, [idx, url]);

    if (!post) return <div>로딩 중...</div>;


    const handleBackButton = () => {
        window.location.href = '/board';
    }
    const handleEditButton = () => {
        window.location.href = `/board/edit/${idx}`;
    }
    const handleDeleteButton = async () => {
      if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
          try {
              await axios.post(`${url}board/delete?=${idx}`);
              alert('게시글이 삭제되었습니다.');
              navigate('/board');
          } catch (error) {
              console.error('Error deleting the post:', error);
              alert('게시글 삭제 중 오류가 발생했습니다.');
          }
      }
  }
    const dept = {
        HR: '인사',
        IT: '전산관리',
        QM: '품질관리',
      };
    return (
        <div>
            <h3 className={styles.text}>게시글</h3>
            <div className={styles.boardContainer}>
                <div className={styles.postContainer}>
                    <h3 className={styles.title}>제목: {post.title}</h3>
                    <div className={styles.etcContainer}>
                        <span>부서: {dept[post.dept]}</span>
                        <span>작성자: {post.userName}</span>
                        <span>작성일: {post.createDate}</span>
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    <p>{post.content}</p>

                </div>
                <button className={styles.BackbuttonContainer} onClick={handleBackButton}>목록</button>
                <button className={styles.EditbuttonContainer} onClick={handleEditButton}>수정</button>
                <button className={styles.DeletebuttonContainer} onClick={handleDeleteButton}>삭제</button>
            </div>

        </div>
    )
}
