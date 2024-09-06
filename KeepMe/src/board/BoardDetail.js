import React from 'react';
import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import styles from './BoardDetail.module.css';
import axios from 'axios';
export default function BoardDetail() {
    const { idx } = useParams();
    const [post, setPost] = useState(null);
    const url = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(`${url}board?idx=${idx}`);
            console.log('asssd',response);
            console.log('as',response.data);
            setPost(response.data);
            console.log('asssdas',response);
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
            </div>

        </div>
    )
}
