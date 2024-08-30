import React from 'react'
import LoginForm from '../login/LoginForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
export default function First() {
  return (
    <Router>
        <div>
            <Routes>
                <Route path="/" element={<LoginForm/>}/>
            </Routes>
        </div>
    </Router>
  )
}
