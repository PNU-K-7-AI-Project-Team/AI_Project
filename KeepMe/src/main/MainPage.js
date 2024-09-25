import React, { useEffect, useState, useRef } from 'react'
import styles from './MainPage.module.css'
import NaverMap from '../map/NaverMap'
import PCountBar from '../peopleCountBor/PCountBar'
import DangerList from '../dangerList/DangerList'
import UserGraph from '../userGraph/UserGraph'
import BoardList from '../board/BoardList'
import { useRecoilState } from 'recoil';
import { socketDataState } from '../recoil/Atoms'; // WebSocket에서 가져온 심박수 데이터

export default function MainPage() {
  const wsRef = useRef(null);
  const [socketData, setSocketData] = useRecoilState(socketDataState);


  useEffect(() => {
    if (!wsRef.current) {
      const url = process.env.REACT_APP_BACKEND_URL;
      wsRef.current = new WebSocket(`${url}pushservice?userId=admin`);
    }
    // WebSocket 연결 성공 시 실행되는 이벤트
    wsRef.current.onopen = () => {
      console.log('WebSocket 연결 성공');
    };
    // WebSocket 메시지 수신 시 실행되는 이벤트
    wsRef.current.onmessage = (e) => {
      const newData = JSON.parse(e.data);
      console.log('newData', newData)
      setSocketData((prevData) => ({
        ...prevData,
        [newData.userCode]: {
          heartbeat: [...(prevData[newData.userCode]?.heartbeat || []), newData.heartbeat].slice(-10),
          temperature: [...(prevData[newData.userCode]?.temperature || []),  Number(newData.temeprature.toFixed(1))].slice(-10),
          latitude: newData.latitude,
          longitude: newData.longitude,
          timestamp: new Date().getTime()
        }
      }));
      // // Recoil 상태 업데이트: 각 userCode에 해당하는 데이터 추가
      // setHeartbeatData((prevData) => {
      //   const updatedData = {
      //     ...prevData,
      //     [data.userCode]: [...(prevData[data.userCode] || []), data.heartbeat],
      //   };
      //   console.log('업데이트된 Recoil 상태:', updatedData);
      //   console.log('setheartbeatdata', setHeartbeatData)
      //   console.log('heartbeatState', heartbeatState)
      //   return updatedData;
      // });
    };

    return () => {
      wsRef.current.close(); // 컴포넌트가 언마운트될 때 웹소켓 연결 종료
    };
  }, [setSocketData]);

  return (
    <div className={styles.bg}>
      <h3 className={styles.text}>전체 현장 관리</h3>
      <div className={styles.fourcontainer}>
        <PCountBar />
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
