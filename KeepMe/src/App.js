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
function Layout() {
  return (
    <>
      <SideBarForm />
      <Footer/>
      <HeaderForm />
      <Outlet/>
    </>
  );
}

function App() {
  const [auth, setAuth] = useState(false);

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
            <Route path="boarddetail/:id" element={<BoardDetail />} />
            <Route path="boardwrite" element={<BoardWrite />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;