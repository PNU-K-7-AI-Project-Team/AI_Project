import { useRecoilValue } from "recoil";
import { socketDataState } from "../recoil/Atoms";
import { useRef } from "react";
import { Line } from 'react-chartjs-2';
import styles from './Heartbeat.module.css';
export default function HeartbeatGraph({ userCode }) {
    const socketData = useRecoilValue(socketDataState);
    const userData = socketData[userCode] || { heartbeat: [], temperature: [] };

    // 최고 심박수와 최저 심박수 계산
    const maxHeartbeat = Math.max(...userData.heartbeat);
    const minHeartbeat = Math.min(...userData.heartbeat);

    const data = {
        labels: userData.heartbeat.map((_, index) => index + 1),
        datasets: [{
            label: 'Heartbeat',
            data: userData.heartbeat,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: Math.min(...userData.heartbeat) - 5,
                suggestedMax: Math.max(...userData.heartbeat) + 5
            }
        },
        animation: {
            duration: 0
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div className={styles.container}>
            <div className={styles.infoSection}>
                <h2>{userCode}의 건강 상태</h2>
                <p>체온 : {userData.temperature[userData.temperature.length - 1].toFixed(1)}°C</p>
                 <p>현재 심박수 : {userData.heartbeat[userData.heartbeat.length - 1]} bpm</p>
                <p>최고 심박수 : {maxHeartbeat} bpm</p>
                <p>최저 심박수 : {minHeartbeat} bpm</p>
            </div>
            <div className={styles.graphSection}>
                <Line data={data} options={options} />
            </div>
        </div>
    )
}