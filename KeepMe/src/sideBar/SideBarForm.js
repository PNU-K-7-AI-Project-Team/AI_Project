import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './SideBarForm.module.css'; // CSS Modules 파일 import
export default function SideBarForm() {
  const navigate = useNavigate();
  const handleKeepMeClick = () => {
    navigate('/');
  };
  const handleBoardClick = () => {
    navigate('/board')
  }
  const handleWorkerClick = () => {
    navigate('/workerboard')
  }
  return (
    <div className={styles.sidebar}>
      <form>
        <div className={styles.formGroup}>
            <h1 className={styles.keepme} onClick={handleKeepMeClick}>Keep me</h1>
        </div>
        <div>
          <button className={styles.button} onClick={handleBoardClick}>공지사항</button>
        </div>
        <div>
          <button className={styles.button1} onClick={handleWorkerClick}>작업자 관리</button>
        </div>
      </form>
    </div>
  )
}
