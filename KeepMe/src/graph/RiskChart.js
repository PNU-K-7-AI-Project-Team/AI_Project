import React from 'react'
import styles from './RiskChart.module.css';
import {useRecoilValue} from 'recoil'
import { Line } from 'react-chartjs-2';
import { socketDataState } from '../recoil/Atoms';
export default function RiskChart({onClose}) {
  const socketData = useRecoilValue(socketDataState);
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
    <div className={styles.container} onClick={e=>e.stopPropagation()}>
  </div>
  </div>
  )
}
