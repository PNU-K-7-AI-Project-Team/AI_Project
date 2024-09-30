import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { socketDataState, userIdState, authState } from '../recoil/Atoms';

export function useWebSocket() {
    const wsRef = useRef(null);
    const [socketData, setSocketData] = useRecoilState(socketDataState);
    const userRole = useRecoilValue(userIdState);
    const isAuth = useRecoilValue(authState);
  
    useEffect(() => {
      if (isAuth && !wsRef.current) {
        const url = process.env.REACT_APP_BACKEND_URL;
        wsRef.current = new WebSocket(`${url}pushservice?userId=${userRole}`);
  
        wsRef.current.onopen = () => {
          console.log('WebSocket 연결 성공');
        };
  
        wsRef.current.onmessage = (e) => {
          const newData = JSON.parse(e.data);
          setSocketData((prevData) => ({
            ...prevData,
            [newData.userCode]: {
              heartbeat: [...(prevData[newData.userCode]?.heartbeat || []), newData.heartbeat].slice(-10),
              temperature: [...(prevData[newData.userCode]?.temperature || []), Number(newData.temperature.toFixed(1))].slice(-10),
              latitude: newData.latitude,
              longitude: newData.longitude,
              timestamp: new Date().getTime()
            }
          }));
        };
      }
  
      return () => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.close();
          console.log("WebSocket 연결 종료");
        }
      };
    }, [isAuth, userRole, setSocketData]);
  
    return socketData;
  }