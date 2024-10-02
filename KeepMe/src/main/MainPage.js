import React, { useEffect, useState, useRef } from 'react'
import styles from './MainPage.module.css'
import NaverMap from '../map/NaverMap'
import PCountBar from '../peopleCountBor/PCountBar'
import HeaderForm from '../header/HeaderForm'
import SideBarForm from '../sideBar/SideBarForm'
import Footer from '../footer/Footer'
import TemperatureG from '../graph/TemperatureG'
import HeartBeatG from '../graph/HeartBeatG'
import { useRecoilState, useRecoilValue } from 'recoil';
import { socketDataState, userIdState, authState, wsState, dangerState } from '../recoil/Atoms'; // WebSocket에서 가져온 심박수 데이터

export default function MainPage() {
  const wsRef = useRef(null);
  const [socketData, setSocketData] = useRecoilState(socketDataState);
  const userRole = useRecoilValue(userIdState) || sessionStorage.getItem('userId');
  const setAuth = useRecoilValue(authState);
  const [ws, setWs] = useRecoilState(wsState); // WebSocket 상태
  const [danger, setDanger] = useRecoilState(dangerState);
  const [istemperature,setIstemperature] = useState(false);
  console.log('danger', danger);
  // const [predictionRiskLevel, setPredictionRiskLevel] = useRecoilState(predictionRiskLevelState);
  console.log('socketData', socketData);
  // const danger = socketData.filter(data => data.predictionRiskLevel === '2');
  // console.log('danger', danger);
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
            temperature: [...(prevData[newData.userCode]?.temperature || []), Number(newData.temperature)].slice(-60),
            latitude: newData.latitude,
            longitude: newData.longitude,
            timestamp: new Date().getTime(),
            predictionRiskLevel: newData.predictionRiskLevel,
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

  Object.keys(socketData).forEach((key) => {
    console.log('userCode:', key, 'predictionRiskLevel:', socketData[key]?.predictionRiskLevel)
  });


  useEffect(() => {
    // socketData가 undefined 또는 null일 경우 방어 코드 추가
    if (!socketData || Object.keys(socketData).length === 0) {
      console.log('socketData is empty or undefined');
      return; // socketData가 비어 있으면 필터링을 건너뜀
    }

    console.log('socketData updated:', socketData);

    // 데이터가 존재하는지 확인하면서 안전하게 필터링
    const filteredData = Object.keys(socketData)
      .filter((key) => {
        const data = socketData[key];
        // data가 존재하고 predictionRiskLevel이 2인 것만 필터링
        return data && data.predictionRiskLevel === 2;
      })
      .map((key) => ({
        userCode: key,
        data: socketData[key],
      }));

    console.log('filteredData:', filteredData);
    setDanger(filteredData); // dangerState에 필터링된 데이터 저장
  }, [socketData, setDanger]); // socketData가 변경될 때마다 필터링을 실행
  const userCount = Object.keys(socketData).length;
  const todayCount = Object.values(socketData).filter(data => {
    const today = new Date().toDateString();
    return new Date(data.timestamp).toDateString() === today;
  }).length;
  // const normalCount = userData.filter(user => user.status === 'normal').length;
  // const dangerCount = userData.filter(user => user.status === 'danger').length;
  // const danger = socketData.map(data => data.predictionRiskLevel === '2');
  // console.log('danger', danger);

  const opentemperature = () => {
    setIstemperature(true);
  }
  const onClose = () => {
    setIstemperature(false);
  }
  const openHeartBeat = () => {
    setIstemperature(true);
  }
  const onCloseHeartBeat = () => {
    setIstemperature(false);
  }
  return (
    <div className={styles.bg}>
      <SideBarForm />
      <HeaderForm />
      <div className={styles.fourcontainer}>
        <PCountBar userCount={userCount} todayCount={todayCount} />
      </div>
      <div>
      <NaverMap />
      <img src= '/img/temperature1.png' className={styles.temperature} onClick={opentemperature}></img>
      {istemperature && <TemperatureG onClose={onClose}/>}
      <img src= '/img/heartbeat.png' className={styles.heartbeat} onClick={openHeartBeat}></img>
      {istemperature && <HeartBeatG onClose={onCloseHeartBeat}/>}
      </div>
      <Footer />
    </div>
  )
}
