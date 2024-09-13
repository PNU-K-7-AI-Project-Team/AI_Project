import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import styles from './BoardDetail.module.css';
import axios from 'axios';
export default function BoardDetail() {
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const url = process.env.REACT_APP_BACKEND_URL;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      };
      const location = useLocation();
      const query = new URLSearchParams(location.search);
      const idx = query.get('idx');

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(`${url}board?idx=${idx}`,{headers : headers});
            setPost(response.data);     
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching the post:', error);
            navigate('/boards');
            
          }
        };
        fetchPost();
      }, [idx, url]);

    if (!post) return <div>로딩 중...</div>;

    const handleEditButton = async () => {
      try {
           const resp = await axios.post(`${url}checkUser?idx=${idx}`, '', {
               headers: headers
           });
           if (resp.status === 200) {
               window.location.href = `/board/edit/${idx}`;
           }
       } catch (error) {
           if (error.response.status === 401) {
               alert('게시물 작성자가 아니므로 해당 게시물을 수정 할 수 없습니다.');
               navigate('/boards');
           }
       }
   }

    const handleDeleteButton = async () => {
          try {
              const resp = await axios.post(`${url}checkUser?idx=${idx}`, '', {
                headers: headers
            });
            if (resp.status === 200) {
              if(window.confirm('정말로 이 게시글을 삭제하시겠습니까?')){
              const response = await axios.post(`${url}board/delete?idx=${idx}`,'',{headers:headers});
              if(response.status===200){
                alert('게시글이 삭제되었습니다.');
                navigate('/boards');
              }else{
                alert('알 수 없는 오류가 발생했습니다.');
              }
            }else{
              alert('게시글 삭제가 취소되었습니다.');
            }
            }
            else{
              alert('권한이 없는 사용자입니다.');
              navigate('/boards');
            }
           } catch (error) {
              if(error.response.status===401){
                console.error('Error deleting the post:', error);
                alert('권한이 없는 사용자입니다.');
                navigate('/boards');
              }else{
                console.error('Error deleting the post:', error);
                alert('알 수 없는 오류가 발생했습니다.');

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
                        
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    <p>{post.content}</p>

                </div>
                <button className={styles.BackbuttonContainer} onClick={() => navigate('/boards')}>목록</button>
                <button className={styles.EditbuttonContainer} onClick={handleEditButton}>수정</button>
                <button className={styles.DeletebuttonContainer} onClick={handleDeleteButton}>삭제</button>
            </div>

        </div>
    )
}
