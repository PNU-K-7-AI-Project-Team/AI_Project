import React, { useState } from 'react'; // useState 훅 추가
import { useNavigate } from 'react-router-dom';
import styles from './SideBarForm.module.css'; // CSS Modules 파일 import
import BoardMain from '../board/BoardMain';
import WorkerBoard from '../workerBoard/WorkerBoard';
export default function SideBarForm() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 열림/닫힘 상태
  const navigate = useNavigate();
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const [isWorkerOpen, setIsWorkerOpen] = useState(false);
  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // 현재 상태의 반대값으로 토글
  };

  const handleKeepMeClick = () => {
    navigate('/main');
  };
  const handleWorkerClick = () => {
    setIsWorkerOpen(true);
  };
  const closeWorker = () => {
    setIsWorkerOpen(false);
  };
  const openBoard = (e) => {
    e.preventDefault();
    setIsBoardOpen(true);
  };
  const closeBoard = () => {
    setIsBoardOpen(false);
  };
  return (
    <div className={styles.sidebar}>
      <h1 className={styles.keepme} onClick={handleKeepMeClick}>Keep me</h1>

      <button className={styles.button1} onClick={openBoard}>공지사항</button>

      {isBoardOpen && <BoardMain onClose={closeBoard} />}


      <button className={styles.button2} onClick={handleWorkerClick}>작업자 관리</button>

      {isWorkerOpen && <WorkerBoard onClose={closeWorker} />}


    </div>
  );
}
