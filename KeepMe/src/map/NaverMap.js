import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './NaverMap.module.css';
import Modal from '../modal/Modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedUserCodeState, socketDataState } from '../recoil/Atoms';
import HeartbeatGraph from '../heartbeat/Heartbeat';
import Line from './Line';

export default function NaverMap({ onLocationClick }) {
  const socketData = useRecoilValue(socketDataState); // WebSocket 데이터를 가져옴
  console.log('socketData', socketData);
  const mapRef = useRef(null); // 맵 인스턴스를 저장할 참조 변수
  const markersRef = useRef({}); // 마커 인스턴스를 저장할 객체
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [selectedUserCode, setSelectedUserCode] = useRecoilState(selectedUserCodeState); // 선택된 사용자 코드 상태
  const { naver } = window; // naver 객체는 Naver Maps API가 로드된 후 접근 가능
  // const [predictionRiskLevel, setPredictionRiskLevel] = useState(null);
  
  // 마커를 생성하는 함수
  const createMarker = (userCode, position, predictionRiskLevel) => {
    let iconUrl;
    // 상태에 따른 아이콘 URL 설정
    switch (predictionRiskLevel) {
      case 0:
        iconUrl = '/img/normal2.png'; // 정상 상태일 때
        break;
      case 1:
        iconUrl = '/img/caution.png'; // 위험 상태일 때
        break;
      case 2:
        iconUrl = '/img/danger2.png'; // 경고 상태일 때 (필요에 따라 이미지 변경)
        break;
      default:
        iconUrl = '/img/normal.png'; // 기본 이미지 (예외 처리용)
    }

    // 마커 생성
    const marker = new naver.maps.Marker({
      position,
      icon: {
        url: iconUrl,
       
      },
      title: `User ${userCode}`,
    });

    // 마커 클릭 이벤트 등록
    naver.maps.Event.addListener(marker, 'click', (e) => {
      e.domEvent.stopPropagation();
      console.log('Marker clicked:', userCode);
      setSelectedUserCode(userCode); // 선택된 사용자 코드 업데이트
      setIsModalOpen(true); // 모달 열기
      if (onLocationClick) {
        onLocationClick(userCode); // 외부 클릭 처리 함수 호출
      }
    });

    return marker;
  };

  // 맵 초기화
  useEffect(() => {
    const initializeMap = () => {
      const { naver } = window; // naver 객체는 Naver Maps API가 로드된 후 접근 가능
      const mapOptions = {
        center: new naver.maps.LatLng(35.1690556955069, 129.0572919426662), // 맵의 중심 좌표
        zoom: 17, // 줌 레벨
      };
      // 맵을 생성하여 mapRef에 저장
      mapRef.current = new naver.maps.Map('map', mapOptions);
    };

    // 맵이 이미 초기화되지 않았을 경우 초기화
    if (!mapRef.current) {
      initializeMap();
    }
  }, []);

  // useEffect(() => {
  //   const refreshInterval = setInterval(() => {
  //     window.location.reload();
  //   }, 60000); // 60000ms = 1분
  //   console.log('refreshInterval', refreshInterval);
  //   // 컴포넌트가 언마운트될 때 인터벌 클리어
  //   return () => clearInterval(refreshInterval);
  // }, []);

  // 마커 업데이트 함수
  useEffect(() => {
    let animationFrameId;

    const updateMarkers = () => {
      Object.entries(socketData).forEach(([userCode, data]) => {
        if (!data.latitude || !data.longitude) {
          console.error(`Invalid position data for user ${userCode}`);
          return; // 위치 데이터가 없으면 무시
        }

        const position = new naver.maps.LatLng(data.latitude, data.longitude);
        const predictionRiskLevel = socketData[userCode].predictionRiskLevel;



        // 이미 있는 마커를 업데이트하거나 새로운 마커를 생성
        if (markersRef.current[userCode]) {
          markersRef.current[userCode].setPosition(position);
        } else {
          markersRef.current[userCode] = createMarker(userCode, position, predictionRiskLevel);

          markersRef.current[userCode].setMap(mapRef.current); // 맵에 마커 추가
        }
      });
    };

    // 애니메이션 프레임으로 마커를 계속 업데이트
    const animate = () => {
      updateMarkers();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 컴포넌트 언마운트 시 애니메이션 프레임 취소
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [socketData, createMarker]);

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserCode(null);
  };

  return (
    <div>
      <div id="map" className={styles.map} /> {/* 맵이 렌더링될 div */}
    
      {isModalOpen && selectedUserCode && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedUserCode && <HeartbeatGraph userCode={selectedUserCode} />} {/* 선택된 사용자 코드에 따른 그래프 표시 */}
        </Modal>
      )}
    </div>
  );
}
