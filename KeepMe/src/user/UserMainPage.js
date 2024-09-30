import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { socketDataState, userIdState, wsState, authState } from '../recoil/Atoms'; // WebSocket에서 가져온 심박수 데이터
import styles from './UserMainPage.module.css';

export default function UserMainPage() {
  const wsRef = useRef(null);
  const [socketData, setSocketData] = useRecoilState(socketDataState);
  const userRole = useRecoilValue(userIdState) || sessionStorage.getItem('userId');
  const [ws, setWs] = useRecoilState(wsState); // WebSocket 상태
  const setAuth = useRecoilValue(authState);

  // userData를 비어있는 배열 또는 초기값으로 정의하여 에러 방지
  
  
  useEffect(() => {
    if (!ws && userRole) {
     
      const url = process.env.REACT_APP_BACKEND_URL;
      const newWs = new WebSocket(`${url}pushservice?userId=${userRole}`);
      setWs(newWs);

      newWs.onopen = () => {
        console.log('WebSocket 연결 성공');
      };

      newWs.onmessage = (e) => {
        const newData = JSON.parse(e.data);
        console.log('newData', newData);
        setSocketData((prevData) => ({
          ...prevData,
            heartbeat: [...(prevData.heartbeat || []), newData.heartbeat].slice(-60),
            temperature: [...(prevData.temperature || []), Number(newData.temperature.toFixed(1))].slice(-60),
            latitude: newData.latitude,
            longitude: newData.longitude,
            timestamp: new Date().getTime()
        }));

      };
    }
    return () => {
      if (ws) {
        ws.onclose = () => {
          console.log('WebSocket 연결 종료');
        };
      }
    };
  }, [setSocketData, userRole, setAuth, ws]);
  const userData = socketData || { heartbeat: [89], temperature: [36.5] };
  console.log('socket data:', socketData); // temperature 배열의 내용을 출력
  console.log('User data:', userData); // temperature 배열의 내용을 출력
  const handleLogout = () => {
    if (window.confirm('정말로 로그아웃 하시겠습니까?')) {
      window.location.href = '/logout';
      sessionStorage.clear();
      localStorage.removeItem('auth');
    }
  };

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}></div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>이창수
                <span className={styles.userRole}>도금</span>
              </div>
              <div className={styles.userCompany}>강남건설</div>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          </button>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.card}>
            <p>상태</p>
          </div>
          <div className={styles.card}>
            <p>기기</p>
          </div>
          <div className={`${styles.card} ${styles.fullWidthCard}`}>
            <p>알림</p>
          </div>
          <div className={`${styles.card} ${styles.fullWidthCard}`}>
            {/* <p>심박수 : {userData.heartbeat[userData.heartbeat.length - 1]} bpm</p> */}
          </div>

          <div className={`${styles.card} ${styles.fullWidthCard}`}>
            {/* 온도 데이터가 있을 때만 출력 */}
            <p>체온</p>
            <p>
              {userData.temperature[userData.temperature.length - 1].toFixed(1)}°C
            </p>
            {/* <p>체온 : {userData.temperature}°C</p> */}
          </div>
        </main>

        <footer className={styles.footer}>
          <p>© 2024 모바일 프로젝트</p>
        </footer>
      </div>
    </div>
  );
}
