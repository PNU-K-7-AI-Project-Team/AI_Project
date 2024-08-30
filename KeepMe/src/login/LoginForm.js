import axios from 'axios';
import React from 'react'
import { useState, useLocation, Link, useNavigate } from 'react-router-dom'
export default function LoginForm({setAuth}) {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]= useState('');
    const navigate = useNavigate();

    const login = async (e) =>{
        e.preventDefault();//폼 제출 시 기본 동작을 막음
        try{
            const response = await axios.post('/login',{
                userid,
                password,
            });
            if(response.status === 200){//서버가 성공적인 응답을 반환했는지 확인, HTTP 상태 코드 200은 성공을 의미
                const{token, userid, expirationTime} = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userid', userid);
                localStorage.setItem('tokenExpiration', expirationTime);//만료시간저장
                setAuth(true);//인증 상태를 true로 설정
                navigate(from);
            }else{
                setError('Login Failed');
            }
        }catch(error){
            setError('Login Failed');
        }
    }

  return (
    <div>
      
    </div>
  )
}
