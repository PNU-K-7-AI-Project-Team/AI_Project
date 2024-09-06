import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BoardWrite.module.css';

export default function BoardWrite() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [department, setDepartment] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 게시글 제출 로직을 구현합니다.
        // 예: API 호출을 통해 서버에 데이터를 전송
        console.log({ title, author, department, content });
        // 제출 후 게시판 목록 페이지로 이동
        navigate('/board');
    };

    const handleCancel = () => {
        navigate('/board');
    };

    return (
        <div className={styles.bg}>
            <h3 className={styles.text}>게시글 작성</h3>
            <div className={styles.boardContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title">제목:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="department">부서:{localStorage.getItem('department')}</label>
                        <input
                            type="text"
                            id="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="author">작성자:{localStorage.getItem('username')}</label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="content">내용:</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    {/* 작성일 처리 필요 */}
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.submitButton}>작성</button>
                        <button type="button" onClick={handleCancel} className={styles.cancelButton}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
}