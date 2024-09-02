import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import MainPage from './main/MainPage';
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';
function App() {
  const [auth, setAuth] = useState(false);
  
  return (
    <Router>
    <div>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginForm setAuth={setAuth}/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
    
        </Routes>
    </div>
</Router>
  );
}

export default App;
