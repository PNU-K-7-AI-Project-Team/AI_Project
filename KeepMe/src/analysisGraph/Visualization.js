import React from 'react';
import { useRecoilValue } from 'recoil';
import { socketDataState } from '../recoil/Atoms';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar
} from 'recharts';

function Visualization({ onClose, userCode, workDate }) {
  const socketData = useRecoilValue(socketDataState);
  console.log('socketData', socketData);
  console.log('userCode', userCode);
  console.log('workDate', workDate);
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.container} onClick={e => e.stopPropagation()}>


        {socketData.map((userCode, index) => {
          const userData = socketData[userCode.userCode]?.[userCode.workDate];
          if (!userData) return null;

          // 준비된 데이터를 Recharts에 맞게 변환
          const chartData = userData.temperature.map((temp, idx) => ({
            time: idx,
            Temperature: temp,
            HeartBeat: userData.heartRate[idx],
            GyroX: userData.gyroData[idx][0],
            GyroY: userData.gyroData[idx][1],
            GyroZ: userData.gyroData[idx][2],
          }));

          const minTemp = Math.min(...userData.temperature);
          const maxTemp = Math.max(...userData.temperature);

          return (
            <div key={index} style={{ marginBottom: '50px' }}>
              <h3>{userCode.userCode} - {userCode.workDate}</h3>

              {/* 온도 변화 그래프 */}
              <h4>온도 변화</h4>
              <LineChart
                width={600}
                height={300}
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{ value: 'Time', position: 'insideBottomRight', offset: 0 }} />
                <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Temperature" stroke="#8884d8" />
              </LineChart>

              {/* 맥박 변화 그래프 */}
              <h4>맥박 변화</h4>
              <LineChart
                width={600}
                height={300}
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{ value: 'Time', position: 'insideBottomRight', offset: 0 }} />
                <YAxis label={{ value: 'HeartBeat (bpm)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="HeartBeat" stroke="#82ca9d" />
              </LineChart>

              {/* 자이로스코프 데이터 그래프 */}
              <h4>자이로스코프 데이터 변화</h4>
              <LineChart
                width={600}
                height={300}
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{ value: 'Time', position: 'insideBottomRight', offset: 0 }} />
                <YAxis label={{ value: 'Gyro Data', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="GyroX" stroke="#8884d8" />
                <Line type="monotone" dataKey="GyroY" stroke="#82ca9d" />
                <Line type="monotone" dataKey="GyroZ" stroke="#ffc658" />
              </LineChart>

              {/* 체온 최소, 최고 범위 막대그래프 */}
              <h4>체온 최소 및 최고 변화 범위</h4>
              <BarChart
                width={600}
                height={300}
                data={[{ name: 'Temperature Range', min: minTemp, max: maxTemp }]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="min" fill="#8884d8" name="Minimum Temperature" />
                <Bar dataKey="max" fill="#82ca9d" name="Maximum Temperature" />
              </BarChart>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Visualization;
