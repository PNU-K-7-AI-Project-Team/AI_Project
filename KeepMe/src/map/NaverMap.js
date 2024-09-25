import React, { useRef, useEffect, useState } from 'react';
import styles from './NaverMap.module.css';
import Modal from '../modal/Modal';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedUserCodeState, socketDataState } from '../recoil/Atoms';
import HeartbeatGraph from '../heartbeat/Heartbeat';
export default function NaverMap({onLocationClick}) {
  const socketData = useRecoilValue(socketDataState);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedUserCode, setSelectedUserCode] = useRecoilState(selectedUserCodeState);
  const { naver } = window;
  console.log('socketData',socketData)
  const createMarker = (userCode, position) => {
    const marker = new naver.maps.Marker({
      position,
      map: mapRef.current,
      icon: {
        url: '/img/normal2.png',
        size: new naver.maps.Size(50, 100),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 50),
      },
      title: `User ${userCode}`,
    });

    // 마커 클릭 이벤트 추가
    naver.maps.Event.addListener(marker, 'click', (e) => {
      e.domEvent.stopPropagation(); // 이벤트 버블링 방지
      console.log('Marker clicked:', userCode);
      setSelectedUserCode(userCode);
      setIsModalOpen(true);
      if (onLocationClick) {
        onLocationClick(userCode);
      }
    });

    return marker;  
  };

  useEffect(() => {
    if (isModalOpen) {
      console.log('Modal opened for user:', selectedUserCode);
      // 필요한 경우 여기에 추가 로직을 구현
    }
  }, [isModalOpen, selectedUserCode]);

  useEffect(() => {
    console.log('Modal open:', isModalOpen);
    console.log('Selected user code:', selectedUserCode);
  }, [isModalOpen, selectedUserCode]);

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(35.16541101278, 129.05720871462),
        zoom: 16,
      };
      mapRef.current = new naver.maps.Map('map', mapOptions);
    };

    if (!mapRef.current) {
      initializeMap();
    }
    // 초기 마커 생성
    Object.entries(socketData).forEach(([userCode, data]) => {
      const position = new naver.maps.LatLng(data.latitude, data.longitude);
      markersRef.current[userCode] = createMarker(userCode, position);
    });
    return () => {
      Object.values(markersRef.current).forEach(marker => marker.setMap(null));
    };
  }, []);

  useEffect(() => {
    Object.entries(socketData).forEach(([userCode, data]) => {
      const position = new naver.maps.LatLng(data.latitude, data.longitude);
      
      if (markersRef.current[userCode]) {
        markersRef.current[userCode].setPosition(position);
      } else {
        markersRef.current[userCode] = createMarker(userCode, position);
      }
    });
  }, [socketData, createMarker,onLocationClick]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserCode(null);
  };
  // useEffect(() => {
  //   const { naver } = window;
  //   if (!mapRef.current && naver) {
  //     const mapOptions = {
  //       center: new naver.maps.LatLng(37.566826, 126.9786567),
  //       zoom: 17
  //     };
  //     mapRef.current = new naver.maps.Map('map', mapOptions);
  //   }
      // const mapCenter = new naver.maps.LatLng(locations[0].lat, locations[0].lng);

      // const map = new naver.maps.Map(mapRef.current, {
      //   center: mapCenter,
      //   zoom: 17, // 지도 확대 정도
      // });
  //   if(location){
  //     const position = new naver.maps.LatLng(location.latitude,location.longitude);
  //     if(!markerRef.current){
  //       markerRef.current = new naver.maps.Marker({
  //         position,
  //         map:mapRef.current,
  //   });
  //     }else{
  //       markerRef.current.setPosition(position);
  //     }
  //     mapRef.current.setCenter(position);
  //   }
  // }, [location]);
  //     locations.forEach((location) => {

  //       const markerIcon = location.isDanger
  //       ? '/img/danger2.png'  // 위험 상태 마커 이미지 경로
  //         : '/img/normal2.png'; // 정상 상태 마커 이미지 경로
  //       console.log('Marker',markerIcon)
  //       const marker = new naver.maps.Marker({
  //         position: new naver.maps.LatLng(location.lat, location.lng),
  //         map,
  //         icon:{
  //           url: markerIcon,
  //           size: new naver.maps.Size(50,100),
  //           origin: new naver.maps.Point(0, 0),
  //           anchor: new naver.maps.Point(25, 50), // 마커 위치 기준점
  //         }
  //       });
  //       // 마커 클릭 시 모달을 열고 userCode 설정
  //       naver.maps.Event.addListener(marker, 'click', () => {
  //         console.log('Selected user code:', location.userCode); // 로그 추가
  //         if(onLocationClick){
  //           setSelectedUserCode(location.userCode); // 마커의 userCode를 설정
  //           setIsModalOpen(true); // 모달 열기
  //           console.log('Selected user code:', location.userCode); // 로그 추가
  //         }
  //       });
  //     });
  //   }
  // }, [onLocationClick,setSelectedUserCode]);

  return (
    <div>
      <div id="map" className={styles.map} />;
     {isModalOpen && selectedUserCode && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
         {selectedUserCode && <HeartbeatGraph userCode={selectedUserCode} />} 
        </Modal>
      )}
    </div>
  )

}
