import { useRecoilValue } from "recoil";
import { socketDataState } from "../recoil/Atoms";
import { useState } from "react";
import { Line } from 'react-chartjs-2';
import styles from './Heartbeat.module.css';
import Visualization from '../map/NaverMap';
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
    const [isMore, setIsMore] = useState(false);
    // 최고 심박수와 최저 심박수 계산
    const maxHeartbeat = Math.max(...userData.heartbeat);
    const minHeartbeat = Math.min(...userData.heartbeat);
    console.log('userData', userData)
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
    const riskLevelMap = {
        0: '정상',
        1: '주의',
        2: '위험',
    };
    const openMore = () => {
        setIsMore(true);
    };
    const onClose = () => {
        setIsMore(false);
    };
    const workDate = socketData[userCode].workDate;
    console.log('workDate', workDate);
    return (
        <div className={styles.container}>
            <div className={styles.infoTitleContainer}><p className={styles.infoTitle}>작업자 : {userCode}</p>
            </div>
            <div className={styles.GraphinfoContainer}>
                <div className={styles.graphSection}>
                    <Line data={data} options={options} />
                </div>
                <div className={styles.infoSection}>
                    <div className={styles.infoConditionContainer}>
                        <h3>상태</h3>
                        <p className={styles.infoCondition}>상태 : {riskLevelMap[userData.riskFlag] || '알 수 없음'}</p>
                        <p className={styles.infoTemperature}>체온 : {userData.temperature[userData.temperature.length - 1].toFixed(1)}°C</p>
                        <p className={styles.infoAction}>행동 : {userData.activity}</p>
                    </div>
                    <div className={styles.infoHeartbeatContainer}>
                        <h3>심박수</h3>
                        <div className={styles.heartbeat}>
                            <p className={styles.infoMaxHeartbeat}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 750" width="24px" fill="#000000" className={styles.icon}><path d="M440-320h80v-168l64 64 56-56-160-160-160 160 56 56 64-64v168Zm40 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg> {maxHeartbeat.toFixed(1)} bpm</p>
                            <p className={styles.infoHeartbeat}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 750" width="24px" fill="#000000"><path d="M160-440v-80h640v80H160Z" /></svg> {userData.heartbeat[userData.heartbeat.length - 1].toFixed(1)} bpm</p>

                            <p className={styles.infoMinHeartbeat}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 750" width="24px" fill="#000000"><path d="m480-320 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg> {minHeartbeat.toFixed(1)} bpm</p>
                        </div>
                    </div>
                </div>
            </div>
            <button className={styles.openMore} onClick={openMore}>더보기</button>
            {isMore && <Visualization onClose={onClose} userCode={userCode} workDate={workDate}/>}
        </div>
    )
}