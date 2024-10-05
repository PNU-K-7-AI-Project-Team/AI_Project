import React, { useEffect, useState, useRef } from 'react'
import styles from './MainPage.module.css'
import NaverMap from '../map/NaverMap'
import PCountBar from '../peopleCountBor/PCountBar'
import HeaderForm from '../header/HeaderForm'
import SideBarForm from '../sideBar/SideBarForm'
import Footer from '../footer/Footer'
import TemperatureG from '../graph/TemperatureG'
import HeartBeatG from '../graph/HeartBeatG'
import RiskChart from '../graph/RiskChart'
import ActiveUsersList from '../analysisGraph/ActiveUsersList'
import { useRecoilState, useRecoilValue } from 'recoil';
import { socketDataState, userIdState, authState, wsState } from '../recoil/Atoms'; // WebSocket에서 가져온 심박수 데이터
export default function MainPage() {
  const wsRef = useRef(null);
  const [socketData, setSocketData] = useRecoilState(socketDataState);
  const userRole = useRecoilValue(userIdState) || sessionStorage.getItem('userId');
  const setAuth = useRecoilValue(authState);
  const [ws, setWs] = useRecoilState(wsState); // WebSocket 상태
  const [istemperature, setIstemperature] = useState(false);
  const [isChart, setIsChart] = useState(false);
  console.log('socketData', socketData);
  const [activeUsers, setActiveUsers] = useState([]);
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
        console.log('소켓에서 받아옴', newData);
        setSocketData((prevData) => ({
          ...prevData,
          [newData.userCode]: {
            heartbeat: [...(prevData[newData.userCode]?.heartbeat || []), newData.heartbeat].slice(-60),
            temperature: [...(prevData[newData.userCode]?.temperature || []), Number(newData.temperature)].slice(-60),
            latitude: newData.latitude,
            longitude: newData.longitude,
            timestamp: new Date().getTime(),
            riskFlag: newData.riskFlag,
            vitalDate: newData.vitalDate,
            workDate: newData.workDate,
            activity: newData.activity,
            outsideTemperature: newData.outsideTemperature,
          }
        }));
        setActiveUsers((prevActiveUsers) => {
          const exists = prevActiveUsers.find(user => user.userCode === newData.userCode && user.workDate === newData.workDate);
          if (!exists) {
            return [...prevActiveUsers, { userCode: newData.userCode, workDate: newData.workDate }];
          }
          return prevActiveUsers;
        });
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

  const userCount = Object.keys(socketData).length;
  const normalCount = Object.values(socketData).filter(data => {
    const normal = data.riskFlag === 0;
    console.log('normal', normal);
    return normal;
  }).length;
  const cautionCount = Object.values(socketData).filter(data => {
    const caution = data.riskFlag === 1;
    console.log('caution', caution);
    return caution;
  }).length;
  const dangerCount = Object.values(socketData).filter(data => {
    const danger = data.riskFlag === 2;
    console.log('danger', danger);
    return danger;
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
  const openChart = () => {
    setIsChart(true);
  }
  const onCloseChart = () => {
    setIsChart(false);
  }

  return (
    <div className={styles.bg}>
      {/* <SideBarForm /> */}
      <HeaderForm />
      <div className={styles.fourcontainer}>
        <PCountBar userCount={userCount} normalCount={normalCount} cautionCount={cautionCount} dangerCount={dangerCount} />
      </div>
      <div>
        <NaverMap />
        {/* <img src='/img/temperature1.png' className={styles.temperature} onClick={opentemperature}></img>
        {istemperature && <ActiveUsersList activeUsers={activeUsers} onClose={onClose} />}
        {/* <img src='/img/heartbeat.png' className={styles.heartbeat} onClick={openHeartBeat}></img>
        {istemperature && <HeartBeatG onClose={onCloseHeartBeat} />}
        <img src='/img/chart.png' className={styles.chart} onClick={openChart}></img>
        {isChart && <RiskChart onClose={onCloseChart} />} */} 
      </div>
      {/* <div>
        <ActiveUsersList activeUsers={activeUsers} />
      </div> */}
      <Footer />
    </div>
  )
}
