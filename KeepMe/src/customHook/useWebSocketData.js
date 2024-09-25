// src/hooks/useWebSocketData.js
import { useEffect, useState } from 'react';

// useWebSocketData 커스텀 훅 정의
export const useWebSocketData = (userId) => {
    // 사용자 정보를 저장할 상태
    const [userInfo, setUserInfo] = useState([]); 
    // 모든 사용자 정보를 저장할 상태 (관리자용)
    const [infos, setInfos] = useState([]); 
    // 웹소켓 연결 URL
    const url = process.env.REACT_APP_BACKEND_URL;

    // userId가 변경되거나 설정되면 웹소켓 연결
    useEffect(() => {
        // userId가 없으면 웹소켓 연결을 하지 않음
        if (!userId) return;

        // 웹소켓 생성, userId를 쿼리 파라미터로 사용
        const ws = new WebSocket(`${url}pushservice?userId=${userId}`);

        // 웹소켓에서 메시지를 수신했을 때 처리하는 이벤트 핸들러
        ws.onmessage = (e) => {
            console.log('Received message:', e.data); // 수신한 메시지 로그
            const data = JSON.parse(e.data); // JSON 형태의 메시지를 파싱
            const { userCode, heartbeat } = data; // 수신 데이터에서 userCode와 heartbeat 추출

            // 관리자인 경우 모든 사용자 정보 업데이트, 그렇지 않으면 개별 사용자 정보 업데이트
            const info = userId === "admin" ? setInfos : setUserInfo;

            // 상태 업데이트
            info((prevInfo) => {
                const updatedInfo = Object.assign({}, prevInfo); // 이전 상태 복사
                if (!updatedInfo[userCode]) {
                    updatedInfo[userCode] = []; // 새로운 userCode가 있으면 빈 배열 초기화
                }
                updatedInfo[userCode].push(heartbeat); // 수신한 heartbeat 추가
                return updatedInfo; // 업데이트된 정보 반환
            });
        };

        // 컴포넌트 언마운트 시 웹소켓 닫기
        return () => {
            if (ws) ws.close(); // 웹소켓이 열려 있으면 닫기
        };
    }, [userId]); // userId가 변경될 때마다 이 effect가 실행됨

    // userInfo와 infos를 반환
    return { userInfo, infos };
};
