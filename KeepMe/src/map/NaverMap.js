import React from 'react'
import { useRef, useEffect } from 'react'
import styles from './NaverMap.module.css'
export default function NaverMap() {
    const mapRef = useRef(null);
    const locations = [
        {lat:35.238641666666666, lng:129.24365166666666 },
        {lat:35.129065, lng:129.08693666666667 },
        {lat:35.18011998, lng:129.077627 },
        {lat:35.17997666666667, lng:129.078785 }, 
        {lat:35.1573938,lng:129.05128355 }, 
    ]
    useEffect(() => {
      const { naver } = window;
      if (mapRef.current && naver) {
        // 첫 번째 위치를 지도 중심으로 설정
        const mapCenter = new naver.maps.LatLng(locations[0].lat, locations[0].lng);
        // const location = new naver.maps.LatLng(lat, lng);
        
        const map = new naver.maps.Map(mapRef.current, {
          center: mapCenter,
          zoom: 17, // 지도 확대 정도
        });
        
        locations.forEach((location)=>{
            const markerPosition = new naver.maps.LatLng(location.lat, location.lng)
            
            new naver.maps.Marker({
              position: location,
              map,
            })
        });
      }
    }, [locations]);

  return (
    <div ref={mapRef} className={styles.map}></div>
  )
}
