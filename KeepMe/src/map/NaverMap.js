import React, { useRef, useEffect, useState } from 'react';
import styles from './NaverMap.module.css';
import Modal from '../modal/Modal';

export default function NaverMap() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);
  const locations = [
    { id: 1, lat: 35.238641666666666, lng: 129.24365166666666 },
    { id: 2, lat: 35.129065, lng: 129.08693666666667 },
    { id: 3, lat: 35.18011998, lng: 129.077627 },
    { id: 4, lat: 35.17997666666667, lng: 129.078785 },
    { id: 5, lat: 35.1573938, lng: 129.05128355 },
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
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(location.lat, location.lng),
          map,
        });

        // 마커 클릭 시 모달을 열지만, 지도의 중심은 변하지 않음
        naver.maps.Event.addListener(marker, 'click', () => {
          setSelectedLocation(location);
        });
      });
    }
  }, []);

  return (
    <div>
      <div ref={mapRef} className={styles.map}></div>
      <Modal isOpen={!!selectedLocation} onClose={() => setSelectedLocation(null)}>
        {selectedLocation && (
          <>
            <h2>위치 ID: {selectedLocation.id}</h2>
            <p>위도: {selectedLocation.lat}</p>
            <p>경도: {selectedLocation.lng}</p>
          </>
        )}
      </Modal>
    </div>
  );
}
