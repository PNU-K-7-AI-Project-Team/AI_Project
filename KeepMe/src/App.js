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
function Layout() {
  return (
    <>
      <SideBarForm />
      <Footer />
      <HeaderForm />
      <Outlet />
    </>
  );
}

function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (token && expirationTime) {
      if (Date.now() >= expirationTime) {
        // 토큰이 만료된 경우 로그아웃 처리
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('tokenExpiration');
        alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
      } else {
        setAuth(true);
      }
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리
    
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('tokenExpiration');
      setAuth(false);
      window.location.href = '/login'; // 로그아웃 후 메인 페이지로 이동
    
  };

  return (
    <div className={styles.bg}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="board" element={<BoardMain />} />
            <Route path="workerboard" element={<WorkerBoard />} />
            <Route path="boarddetail/:idx" element={<BoardDetail />} />
            <Route path="boardwrite" element={<BoardWrite />} />
            <Route path="board/edit/:idx" element={<BoardEdit/>} />
            {/* <Route path="boarddetail/:idx/delete" element={<BoardWrite />} /> */}
            <Route path="logout" element={<Logout onLogout={handleLogout} />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;