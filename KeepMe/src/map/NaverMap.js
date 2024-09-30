import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './NaverMap.module.css';
import Modal from '../modal/Modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedUserCodeState, socketDataState } from '../recoil/Atoms';
import HeartbeatGraph from '../heartbeat/Heartbeat';

export default function NaverMap({onLocationClick}) {
  const socketData = useRecoilValue(socketDataState);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const clusterRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserCode, setSelectedUserCode] = useRecoilState(selectedUserCodeState);
  const { naver } = window;

  const createMarker = useCallback((userCode, position) => {
    const marker = new naver.maps.Marker({
      position,
      icon: {
        url: '/img/normal2.png',
        size: new naver.maps.Size(50, 100),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 50),
      },
      title: `User ${userCode}`,
    });

    naver.maps.Event.addListener(marker, 'click', (e) => {
      e.domEvent.stopPropagation();
      console.log('Marker clicked:', userCode);
      setSelectedUserCode(userCode);
      setIsModalOpen(true);
      if (onLocationClick) {
        onLocationClick(userCode);
      }
    });

    return marker;
  }, [onLocationClick, setSelectedUserCode]);

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(35.1690556955069, 129.0572919426662),
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT
        }
      };
      mapRef.current = new naver.maps.Map('map', mapOptions);

      if (window.MarkerClustering) {
        clusterRef.current = new window.MarkerClustering({
          minClusterSize: 10,
          maxZoom: 18,
          map: mapRef.current,
          markers: [],
          disableClickZoom: false,
          gridSize: 120,
          icons: [
            {
              content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:rgba(255,90,90,0.9);border-radius:50%;">${count}</div>',
              size: new naver.maps.Size(40, 40),
              anchor: new naver.maps.Point(20, 20)
            },
          ],
          indexGenerator: [10, 100, 200, 500, 1000],
          stylingFunction: function(clusterMarker, count) {
            const element = clusterMarker.getElement();
            if (element) {
              const div = element.querySelector('div:first-child');
              if (div) {
                div.textContent = count;
              }
            }
          }
        });
      } else {
        console.error('MarkerClustering is not available');
      }
    };

    if (!mapRef.current) {
      initializeMap();
    }

    return () => {
      if (clusterRef.current) {
        clusterRef.current.setMap(null);
      }
    };
  }, []);

  useEffect(() => {
    let animationFrameId;

    const updateMarkers = () => {
      if (clusterRef.current) {
        const markers = Object.entries(socketData).map(([userCode, data]) => {
          const position = new naver.maps.LatLng(data.latitude, data.longitude);
          let marker = markersRef.current[userCode];
          
          if (marker) {
            marker.setPosition(position);
          } else {
            marker = createMarker(userCode, position);
            markersRef.current[userCode] = marker;
          }
          
          return marker;
        });

        clusterRef.current.setMarkers(markers);
      } else {
        Object.entries(socketData).forEach(([userCode, data]) => {
          const position = new naver.maps.LatLng(data.latitude, data.longitude);
          
          if (markersRef.current[userCode]) {
            markersRef.current[userCode].setPosition(position);
          } else {
            markersRef.current[userCode] = createMarker(userCode, position);
            markersRef.current[userCode].setMap(mapRef.current);
          }
        });
      }
    };

    const animate = () => {
      updateMarkers();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [socketData, createMarker]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserCode(null);
  };

  return (
    <div>
      <div id="map" className={styles.map} />
      {isModalOpen && selectedUserCode && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedUserCode && <HeartbeatGraph userCode={selectedUserCode} />} 
        </Modal>
      )}
    </div>
  )
}