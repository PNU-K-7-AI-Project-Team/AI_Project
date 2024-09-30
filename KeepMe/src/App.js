import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { RecoilRoot, useSetRecoilState, useRecoilValue } from 'recoil';
import { authState, userRoleState } from './recoil/Atoms';
import styles from './App.module.css'
import { useState, useEffect } from 'react';
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
import UserMainPage from './user/UserMainPage';


// function AuthInitializer() {
//   const setAuth = useSetRecoilState(authState);
//   useEffect(() => {
//     const storedAuth = localStorage.getItem('auth') === 'true' || sessionStorage.getItem('auth') === 'true';
//     setAuth(storedAuth);
//   }, [setAuth]);
//   return null;
// }

function App() {
  const setAuth = useRecoilValue(authState);
  console.log('setAuth', setAuth)

  return (
    <RecoilRoot>
      {/* <AuthInitializer /> */}
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} className={styles.LoginForm} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/user" element={<UserMainPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/boards" element={<BoardMain />} />
          <Route path="/map" element={<NaverMap />} />
          <Route path="/workerboard" element={<WorkerBoard />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/board" element={<BoardDetail />} />
          <Route path="/board/write" element={<BoardWrite />} />
          <Route path="/board/edit" element={<BoardEdit />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/boardlist" element={<BoardList />} />

        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
