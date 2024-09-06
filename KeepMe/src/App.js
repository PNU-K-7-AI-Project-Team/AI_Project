import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import styles from './App.module.css'
import { useState } from 'react';
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
            <Route path="boarddetail/:idx/edit" element={<BoardWrite />} />
            <Route path="boarddetail/:id/delete" element={<BoardWrite />} />
            <Route path="logout" element={<Logout onLogout={handleLogout} />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;