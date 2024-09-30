import React from 'react'
import styles from './UserMainPage.module.css'
import { useRecoilState } from 'recoil';
import { socketDataState } from '../recoil/Atoms'; // WebSocket에서 가져온 심박수 데이터
import { useEffect, useRef } from 'react';
import { userIdState } from '../recoil/Atoms';
import { useRecoilValue } from 'recoil';
export default function UserMainPage() {
  const wsRef = useRef(null);
  const [socketData, setSocketData] = useRecoilState(socketDataState);
  const userRole = useRecoilValue(userIdState);
  useEffect(() => {
    if (!wsRef.current) {
      const url = process.env.REACT_APP_BACKEND_URL;
      wsRef.current = new WebSocket(`${url}pushservice?userId=${userRole}`);
    }
    wsRef.current.onopen = () => {
      console.log('WebSocket 연결 성공');
    };

    wsRef.current.onmessage = (e) => {
      const newData = JSON.parse(e.data);
      console.log('newData', newData)
      setSocketData((prevData) => ({
        ...prevData,
        [newData.userCode]: {
          heartbeat: [...(prevData[newData.userCode]?.heartbeat || []), newData.heartbeat].slice(-10),
          temperature: [...(prevData[newData.userCode]?.temperature || []),  Number(newData.temperature.toFixed(1))].slice(-10),
          latitude: newData.latitude,
          longitude: newData.longitude,
          timestamp: new Date().getTime()
        }
      }));
    };

    
    return () => {
      wsRef.current.close(); // 컴포넌트가 언마운트될 때 웹소켓 연결 종료
    };
  }, [setSocketData]);

  const handleLogout = () => {
    if(window.confirm('정말로 로그아웃 하시겠습니까?')){
      window.location.href = '/logout';
      sessionStorage.clear();
      localStorage.removeItem('auth');
    }
  };
  
  return (
    <div className={styles.container}>
      <button onClick={handleLogout}>로그아웃</button>
    <header className={styles.header}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}></div>
        <div className={styles.userDetails}>
          <div className={styles.userName}>이창수</div>
          <div className={styles.userCompany}>강남건설</div>
          <span className={styles.userRole}>도금</span>
        </div>
      </div>
      <div className={styles.settingsIcon}>⚙️</div>
    </header>

    <main className={styles.mainContent}>
      <div className={styles.card}>
        {/* 카드 내용 */}
      </div>
      <div className={styles.card}>
        {/* 카드 내용 */}
      </div>
      <div className={`${styles.card} ${styles.fullWidthCard}`}>
        {/* 전체 너비 카드 내용 */}
      </div>
      <div className={`${styles.card} ${styles.fullWidthCard}`}>
        {/* 전체 너비 카드 내용 */}
      </div>
      <div className={`${styles.card} ${styles.fullWidthCard}`}>
        {/* 전체 너비 카드 내용 */}
      </div>
    </main>

    <footer className={styles.footer}>
      <p>© 2024 모바일 프로젝트</p>
    </footer>
  </div>
  )
}
