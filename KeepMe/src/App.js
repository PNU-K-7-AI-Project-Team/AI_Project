import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import styles from './App.module.css'
import { useState , useEffect} from 'react';
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
  // const [ws, setWs] = useState(null);
  // const [alertMessage, setAlertMessage] = useState('');
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const expirationTime = sessionStorage.getItem('tokenExpiration');

    if (token && expirationTime) {
      if (Date.now() >= expirationTime) {
        // 토큰이 만료된 경우 로그아웃 처리
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('tokenExpiration');
        alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
      } else {
        setAuth(true);
      }
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('tokenExpiration');
      setAuth(false);
      window.location.href = '/login'; // 로그아웃 후 메인 페이지로 이동
    
  };

  // useEffect(()=>{
  //   if (auth){//인중된 경우에만 웹소켓 연결
  //     const websocket = new WebSocket('ws://localhost:8080/ws');//웹소켓 서버 연결
  //     websocket.onopen = () => {
  //       console.log('웹소켓 연결 성공');
  //       setWs(websocket);//웹소켓 객체를 상태로 저장
  //     }
  //     websocket.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //       if (data.type === 'alert'){
  //         setAlertMessage(data.message);
  //         alert(`경고: ${data.message}`);
  //       }
  //     }
  //     websocket.onclose = () => {
  //       console.log('웹소켓 연결 종료');
  //       setWs(null);
  //     }
  //     websocket.onerror = (error) => {
        
  //   }
  // })

  return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm setAuth={setAuth} />} className={styles.LoginForm} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="board" element={<BoardMain />} />
            <Route path="workerboard" element={<WorkerBoard />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="boarddetail/:idx" element={<BoardDetail />} />
            <Route path="boardwrite" element={<BoardWrite />} />
            <Route path="board/edit/:idx" element={<BoardEdit/>} />
            <Route path="logout" element={<Logout onLogout={handleLogout} />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;