import React, { useState } from 'react'; // useState 훅 추가
import { useNavigate } from 'react-router-dom';
import styles from './SideBarForm.module.css'; // CSS Modules 파일 import

export default function SideBarForm() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 열림/닫힘 상태
  const navigate = useNavigate();

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // 현재 상태의 반대값으로 토글
  };

  const handleKeepMeClick = () => {
    navigate('/');
  };
  const handleBoardClick = () => {
    navigate('/boards');
  };
  const handleWorkerClick = () => {
    navigate('/workerboard');
  };

  return (
    <div>
        {/* 사이드바가 닫혀 있을 때만 버튼을 표시 */}
        {!isSidebarOpen && (
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          Open Sidebar
        </button>
      )}
      {/* 사이드바 */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.showSidebar : styles.hideSidebar}`}>
        <form>
          <div className={styles.formGroup}>
            <h1 className={styles.keepme} onClick={handleKeepMeClick}>Keep me</h1>
          </div>
          <div>
            <button className={styles.button1} onClick={handleBoardClick}>공지사항</button>
          </div>
          <div>
            <button className={styles.button2} onClick={handleWorkerClick}>작업자 관리</button>
          </div>
        </form>
      </aside>
    </div>
  );
}
