import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { socketDataState } from '../recoil/Atoms';

export default function Line({ userCode }) {
  const mapRef = useRef(null);
  const polylineRef = useRef(null);
  const socketData = useRecoilValue(socketDataState); // WebSocket 데이터를 가져옴
  const { naver } = window;

  // 랜덤 색상을 생성하는 함수
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    // 폴리라인을 초기화
    const initializePolyline = () => {
      polylineRef.current = new naver.maps.Polyline({
        map: mapRef.current,
        path: [],
        strokeColor: getRandomColor(), // 유저 코드에 따라 랜덤 색상 지정
        strokeWeight: 2,
        strokeStyle: 'shortdash', // 점선 스타일
      });
    };

    // 폴리라인이 없을 경우 초기화
    if (!polylineRef.current) {
      initializePolyline();
    }

    // 마커의 움직임에 따라 라인을 그리기
    const updateLine = () => {
      if (socketData[userCode]) {
        const { latitude, longitude } = socketData[userCode];
        const newPosition = new naver.maps.LatLng(latitude, longitude);

        // 폴리라인에 새로운 좌표 추가
        const path = polylineRef.current.getPath();
        path.push(newPosition);
        polylineRef.current.setPath(path);
      }
    };

    // 웹소켓 데이터가 업데이트될 때마다 라인을 그리기
    const interval = setInterval(updateLine, 500); // 0.5초마다 업데이트

    // 컴포넌트가 언마운트될 때 인터벌 클리어
    return () => clearInterval(interval);
  }, [socketData, userCode]);

  return null;
}
