import { useRecoilValue } from "recoil";
import { socketDataState } from "../recoil/Atoms";
import { Line } from 'react-chartjs-2';
import styles from './Heartbeat.module.css';
import {
    Chart,
    CategoryScale, // 여기에 'category' 스케일 추가
    LinearScale,    // y축에 필요한 'linear' 스케일
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // 필요한 컴포넌트와 스케일을 등록
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
export default function HeartbeatGraph({ userCode }) {
    const socketData = useRecoilValue(socketDataState);
    const userData = socketData[userCode] || { heartbeat: [], temperature: [] };

    // 최고 심박수와 최저 심박수 계산
    const maxHeartbeat = Math.max(...userData.heartbeat);
    const minHeartbeat = Math.min(...userData.heartbeat);
    console.log('userData',userData)
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
            },
            
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
                <h2>작업자 : {userCode}</h2>
                <p>체온 : {userData.temperature[userData.temperature.length - 1].toFixed(1)}°C</p>
                <p>현재 심박수 : {userData.heartbeat[userData.heartbeat.length - 1].toFixed(1)} bpm</p>
                <p>최고 심박수 : {maxHeartbeat.toFixed(1)} bpm</p>
                <p>최저 심박수 : {minHeartbeat.toFixed(1)} bpm</p>
                <p>예측 위험 등급 : {userData.predictionRiskLevel}</p>
            </div>
            <div className={styles.graphSection}>
                <Line data={data} options={options} />
            </div>
        </div>
    )
}