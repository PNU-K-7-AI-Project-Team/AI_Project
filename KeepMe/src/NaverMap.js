import React, { useRef, useEffect, useState } from 'react';
import styles from './NaverMap.module.css';
import Modal from '../modal/Modal';
import RiskAnalysis from '../Risk/RiskAnalysis';

export default function NaverMap({onLocationClick}) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);
  const locations = [
    { userCode: 1, lat: 35.238641666666666, lng: 129.24365166666666 ,isDanger:true },
    { userCode: 2, lat: 35.129065, lng: 129.08693666666667,isDanger:false },
    { userCode: 3, lat: 35.18011998, lng: 129.077627,isDanger:true },
    { userCode: 4, lat: 35.17997666666667, lng: 129.078785,isDanger:false },
    { userCode: 5, lat: 35.1573938, lng: 129.05128355,isDanger:true },
  ];

  
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
        ? '/img/danger.png'  // 위험 상태 마커 이미지 경로
          : '/img/normal.png'; // 정상 상태 마커 이미지 경로
        console.log('Marker',markerIcon)
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(location.lat, location.lng),
          map,
          icon:{
            url: markerIcon,
            size: new naver.maps.Size(500,500),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(12, 24), // 마커 위치 기준점
          }
        });

        // 마커 클릭 시 모달을 열지만, 지도의 중심은 변하지 않음
        naver.maps.Event.addListener(marker, 'click', () => {
          setSelectedLocation(location);
          if(onLocationClick){
            onLocationClick(location.userCode);
            console.log('larwerawer',location.userCode)
          }//마커 클릭 시 해당 usercode전달
        });
      });
    }
  }, [ locations, onLocationClick]);

  return (
    
      <div ref={mapRef} className={styles.map}>  <Modal isOpen={!!selectedLocation} onClose={() => setSelectedLocation(null)}>
        {selectedLocation && (
          <>
        
            {/* RiskAnalysis 컴포넌트를 사용하여 해당 유저의 심박수 그래프를 표시 */}
            <RiskAnalysis selectedUserCode={selectedLocation.userCode} />
          </>
        )}
      </Modal></div>
    
    
  );
}
