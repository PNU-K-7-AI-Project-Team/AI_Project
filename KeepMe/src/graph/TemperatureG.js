import React from 'react'
import styles from './TemperatureG.module.css'
import {useRecoilValue} from 'recoil'
import { Line } from 'react-chartjs-2';
import { socketDataState } from '../recoil/Atoms';
export default function TemperatureG({onClose}) {
  const socketData = useRecoilValue(socketDataState);
  return (
    <div> 
    </div>
  )
}
