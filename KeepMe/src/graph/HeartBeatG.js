import React from 'react'
import styles from './HeartBeatG.module.css'
import { useRecoilValue } from 'recoil'
import { Line } from 'react-chartjs-2';
import { socketDataState } from '../recoil/Atoms';
import axios from 'axios';
import { useEffect } from 'react';
export default function HeartBeatG({ onClose }) {
  const socketData = useRecoilValue(socketDataState);
  const token = sessionStorage.getItem('token');
  const url = process.env.REACT_APP_BACKEND_URL;
  const fetchHeartBeatData = async () => {
    try{
      const response = await axios.get(`${url}/alllog`, {
        params: {

        },
        headers: {
          'Authorization': token
        }
      })
      const heartBeatData = response.data;
      console.log('heartBeatData', heartBeatData);

    } catch (error) {
      console.error('Error fetching heartbeat data:', error);
    }
  }
  useEffect(() => {
    fetchHeartBeatData();
  }, []);
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.container} onClick={e => e.stopPropagation()}>

      </div>
    </div>
  )
}
