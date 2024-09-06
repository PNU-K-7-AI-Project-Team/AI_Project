import React from 'react';
import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import styles from './BoardDetail.module.css';
import axios from 'axios';
export default function BoardDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const url = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(`${url}/boards/${id}`);
            setPost(response.data);
          } catch (error) {
            console.error('Error fetching the post:', error);
          }
        };
        fetchPost();
      }, [id, url]);
    if (!post) return <div>로딩 중...</div>;


    const handleBackButton = () => {
        window.location.href = '/board';
    }
    return (
        <div>
            <h3 className={styles.text}>게시글</h3>
            <div className={styles.boardContainer}>
                <div className={styles.postContainer}>
                    <h3 className={styles.title}>제목: {post.title}</h3>
                    <div className={styles.etcContainer}>
                        <span>부서: {post.department}</span>
                        <span>작성자: {post.author}</span>
                        <span>작성일: {post.date}</span>
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    <p>{post.content}</p>

                </div>
                <button className={styles.BackbuttonContainer}onClick={handleBackButton}>목록</button>
            </div>

        </div>
    )
}
