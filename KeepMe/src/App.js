import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import styles from './App.module.css'
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import MainPage from './main/MainPage';
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';
import BoardMain from './board/BoardMain';
import WorkerBoard from './workerBoard/WorkerBoard';
import BoardDetail from './board/BoardDetail';
import SideBarForm from './sideBar/SideBarForm';
import HeaderForm from './header/HeaderForm';
import Footer from './footer/Footer';
import BoardWrite from './board/BoardWrite';
import Logout from './logout/Logout';
import BoardEdit from './board/BoardEdit';
import MyPage from './myPage/Mypage';
import BoardList from './board/BoardList';
import NaverMap from './map/NaverMap';
import RiskAnalysis from './Risk/RiskAnalysis';

function Layout() {
  return (
    <div className={styles.bg}>
      <Footer />
      <HeaderForm />
      <SideBarForm />
      <Outlet />
    </div>
  );
}

function App() {
  const [auth, setAuth] = useState(false);

  // useEffect(() => {
  //   const token = sessionStorage.getItem('token');
  //   const expirationTime = sessionStorage.getItem('tokenExpiration');
  //   if (token && expirationTime && Date.now() < expirationTime) {
  //     setAuth(true);//토큰이 유효하면 로그인 상태로 설정
  //   } else {
  //     sessionStorage.clear();//토큰 만료 또는 유효하지 않으면 로그아웃 처리 
  //   }
  // }, []);

  // WebSocket 연결 설정
  // useEffect(() => {
  //   console.log('auth', auth)
  //   if(wsRef.current){
  //     wsRef.current.close();
  //   }

  //   if (auth) {
  //     const url = process.env.REACT_APP_BACKEND_URL;
  //     wsRef.current = new WebSocket(`${url}pushservice?userId=admin`);

  //     // WebSocket 연결 성공 시 실행되는 이벤트
  //     wsRef.current.onopen = () => {
  //       console.log('WebSocket 연결 성공');
  //     };
  //     // WebSocket 메시지 수신 시 실행되는 이벤트
  //     wsRef.current.onmessage = (e) => {
  //       const data = JSON.parse(e.data);
  //       console.log('WebSocket 메시지 수신:', data);  // 데이터 수신 확인

  //       // Recoil 상태 업데이트: 각 userCode에 해당하는 데이터 추가
  //       setHeartbeatData((prevData) => {
  //         const updatedData = {
  //           ...prevData,
  //           [data.userCode]: [...(prevData[data.userCode] || []), data.heartbeat],
  //         };
  //         console.log('업데이트된 Recoil 상태:', updatedData);
  //         console.log('setheartbeatdata',setHeartbeatData)
  //         console.log('heartbeatState',heartbeatState)
  //         return updatedData;
  //       });
  //     };
  //     wsRef.current.onerror = (error) => {
  //       console.error('WebSocket 오류 발생:', error);
  //     };
  //     wsRef.current.onclose = (event) => {
  //       console.log('WebSocket 연결 종료:', event);
  //     };
  //   }
  //   return () => {
  //     if (wsRef.current) {
  //       wsRef.current.close();
  //     }
  //   };
  // }, [auth, setHeartbeatData,heartbeatState]);

  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm setAuth={setAuth} />} className={styles.LoginForm} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/" element={auth ? <Layout /> : <LoginForm setAuth={setAuth} />}>
            <Route index element={<MainPage />} >
            </Route>
              <Route path="/boards" element={<BoardMain />} />
              <Route path="/map" element={<NaverMap  />} />
              <Route path="/workerboard" element={<WorkerBoard />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/board" element={<BoardDetail />} />
              <Route path="/board/write" element={<BoardWrite />} />
              <Route path="/board/edit" element={<BoardEdit />} />
              <Route path="/logout" element={<Logout onLogout={() => setAuth(false)} />} />
              <Route path="/boardlist" element={<BoardList />} />
              <Route path="/risk" element={<RiskAnalysis/>}/>
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
