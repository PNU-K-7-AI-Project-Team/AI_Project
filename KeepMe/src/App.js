import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import MainPage from './main/MainPage';
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';
import BoardMain from './board/BoardMain';
import WorkerBoard from './workerBoard/WorkerBoard';
function App() {
  const [auth, setAuth] = useState(false);
  
  return (
    <Router>
    <div>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginForm setAuth={setAuth}/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/board" element={<BoardMain/>}/>
            <Route path="/workerboard" element={<WorkerBoard/>}/>

        </Routes>
    </div>
</Router>
  );
}

export default App;
