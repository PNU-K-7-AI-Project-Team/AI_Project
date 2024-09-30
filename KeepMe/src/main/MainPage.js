import React, { useEffect, useState, useRef } from 'react'
import styles from './MainPage.module.css'
import NaverMap from '../map/NaverMap'
import PCountBar from '../peopleCountBor/PCountBar'
import DangerList from '../dangerList/DangerList'
import UserGraph from '../userGraph/UserGraph'
import BoardList from '../board/BoardList'
import HeaderForm from '../header/HeaderForm'
import SideBarForm from '../sideBar/SideBarForm'
import { useRecoilState, useRecoilValue } from 'recoil';
import { socketDataState, userIdState, authState, wsState } from '../recoil/Atoms'; // WebSocket에서 가져온 심박수 데이터

export default function MainPage() {
  const wsRef = useRef(null);
  const [socketData, setSocketData] = useRecoilState(socketDataState);
  const userRole = useRecoilValue(userIdState) || sessionStorage.getItem('userId');
  const setAuth = useRecoilValue(authState);
  const [ws, setWs] = useRecoilState(wsState); // WebSocket 상태
  
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
          [newData.userCode]: {
            heartbeat: [...(prevData[newData.userCode]?.heartbeat || []), newData.heartbeat].slice(-60),
            temperature: [...(prevData[newData.userCode]?.temperature || []), Number(newData.temperature.toFixed(1))].slice(-60),
            latitude: newData.latitude,
            longitude: newData.longitude,
            timestamp: new Date().getTime()
          }
          
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

  const userCount  = Object.keys(socketData).length;
  const todayCount = Object.values(socketData).filter(data => {
    const today = new Date().toDateString();
    return new Date(data.timestamp).toDateString() === today;
  }).length;
  // const normalCount = userData.filter(user => user.status === 'normal').length;
  // const dangerCount = userData.filter(user => user.status === 'danger').length;


  return (
    <div className={styles.bg}>
      <h3 className={styles.text}>전체 현장 관리</h3>
     <SideBarForm />
     <HeaderForm />
      <div className={styles.fourcontainer}>
        <PCountBar userCount={userCount} todayCount={todayCount}  />
      </div>
      <NaverMap />
      <div className={styles.threecontainer}>
        <div>
          <UserGraph />
        </div>
        <div>
          <DangerList />
        </div>
        <div>
          <BoardList />
        </div>
      </div>
    </div>
  )
}
