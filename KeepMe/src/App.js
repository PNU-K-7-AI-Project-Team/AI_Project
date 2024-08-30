import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './main/MainPage';
function App() {
  return (
    <Router>
    <div>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
        </Routes>
    </div>
</Router>
  );
}

export default App;
