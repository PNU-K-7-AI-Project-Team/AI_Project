import React, { useRef, useEffect, useState } from 'react';
import styles from './NaverMap.module.css';
import Modal from '../modal/Modal';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedUserCodeState, socketDataState } from '../recoil/Atoms';
import RiskAnalysis from '../Risk/RiskAnalysis';
export default function NaverMap({onLocationClick}) {
  const socketData = useRecoilValue(socketDataState);
  const mapRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const locations = [
    { userCode: 35, lat: 35.238641666666666, lng: 129.24365166666666 ,isDanger:true },
    { userCode: 2, lat: 35.129065, lng: 129.08693666666667,isDanger:false },
    { userCode: 3, lat: 35.18011998, lng: 129.077627,isDanger:true },
    { userCode: 4, lat: 35.17997666666667, lng: 129.078785,isDanger:false },
    { userCode: 5, lat: 35.1573938, lng: 129.05128355,isDanger:true },
  ];
  const setSelectedUserCode = useSetRecoilState(selectedUserCodeState);
  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const mapCenter = new naver.maps.LatLng(locations[0].lat, locations[0].lng);

      const map = new naver.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 17, // 지도 확대 정도
      });

      locations.forEach((location) => {

        const markerIcon = location.isDanger
        ? '/img/danger2.png'  // 위험 상태 마커 이미지 경로
          : '/img/normal2.png'; // 정상 상태 마커 이미지 경로
        console.log('Marker',markerIcon)
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(location.lat, location.lng),
          map,
          icon:{
            url: markerIcon,
            size: new naver.maps.Size(50,100),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(25, 50), // 마커 위치 기준점
          }
        });
        // 마커 클릭 시 모달을 열고 userCode 설정
        naver.maps.Event.addListener(marker, 'click', () => {
          if(onLocationClick){
            setSelectedUserCode(location.userCode); // 마커의 userCode를 설정
            setIsModalOpen(true); // 모달 열기

          }
        });
      });
    }
  }, [ locations, setSelectedUserCode]);

  return (
    <div>
      <div ref={mapRef} className={styles.map} />;
      {/* 모달은 마커 클릭 시에만 렌더링 */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <RiskAnalysis />
        </Modal>
      )}
    </div>
  )
  
    
    
  
}
