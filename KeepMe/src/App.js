import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { RecoilRoot, useSetRecoilState, useRecoilValue } from 'recoil';
import { authState } from './recoil/Atoms';

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
function AuthInitializer() {
  const setAuth = useSetRecoilState(authState);
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth === 'true') {
      setAuth(true);
    }
  }, [setAuth]);
  return null;
}
function App() {
  const [auth, setAuth] = useState(false);

  function ProtectedRoute({ children }) {
    const auth = useRecoilValue(authState);
    return auth ? children : <Navigate to="/login" />;
  }

  return (
    <RecoilRoot>
      <AuthInitializer />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm setAuth={setAuth} />} className={styles.LoginForm} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/boards" element={<BoardMain />} />
            <Route path="/map" element={<NaverMap />} />
            <Route path="/workerboard" element={<WorkerBoard />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/board" element={<BoardDetail />} />
            <Route path="/board/write" element={<BoardWrite />} />
            <Route path="/board/edit" element={<BoardEdit />} />
            <Route path="/logout" element={<Logout onLogout={() => setAuth(false)} />} />
            <Route path="/boardlist" element={<BoardList />} />
            <Route path="/risk" element={<RiskAnalysis />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
