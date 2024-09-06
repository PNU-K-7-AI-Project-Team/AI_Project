import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({onLogout}) {
    const navigate = useNavigate();
    useEffect(() => {
        // 공통 로그아웃 함수를 호출
        if (onLogout) {
          onLogout();
        }
        navigate('/login');
    }, [navigate, onLogout]);
    
  return (
    <div>
     
    </div>
  )
}
