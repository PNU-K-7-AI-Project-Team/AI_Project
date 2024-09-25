import { useRecoilValue } from "recoil";
import { socketDataState } from "../recoil/Atoms";
import { useRef } from "react";
import { Line } from 'react-chartjs-2';

export default function HeartbeatGraph({ userCode }) {
    const socketData = useRecoilValue(socketDataState);
    const userData = socketData[userCode] || { heartbeat: [], temperature: [] };

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
        <div>
            <h2>{userCode}의 건강 상태</h2>
            <p>Latest Temperature: {userData.temperature[userData.temperature.length - 1].toFixed(1)}°C</p>
            <div style={{ height: '300px' }}>
                <Line data={data} options={options} />
            </div>
        </div>
    )
}