import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'
export default function LoginForm({setAuth}) {
    const [userId, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]= useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';
    const url = process.env.REACT_APP_BACKEND_URL;
    

    const login = async (e) =>{
        e.preventDefault();//폼 제출 시 기본 동작을 막음
        try{
            const response = await axios.post(`${url}login`,{
                userId,
                password,
            });
            if(response.status === 200){//서버가 성공적인 응답을 반환했는지 확인, HTTP 상태 코드 200은 성공을 의미
                const{token, userId, expirationTime} = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('tokenExpiration', expirationTime);//만료시간저장
                setAuth(true);//인증 상태를 true로 설정
                navigate('/')
            }else{
                setError('Login Failed');
            }
        }catch(error){
            setError('Login Failed');
        }
    }
    const joinclick = ()=>{
        navigate('/register')
    }


  return (
    <div className={styles.LoginForm}>
        <h1 className={styles.name}>login</h1>
      <form onSubmit={login}>
        <div>
            {/* <label className={styles.UseridT}>Userid</label> */}
            <input type='userid' className={styles.id} placeholder='UserId' value={userId} onChange={(e)=> setUserid(e.target.value)}/>
        </div>
        <div>
            {/* <label className={styles.PasswordT}>Password</label> */}
            <input type='password'  className={styles.password} placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <div>
            <button className={styles.login} type="submit">
                Login
            </button>
        </div>
        <div>
            <button className={styles.join} onClick={joinclick} >
                Join
            </button>
        </div>
      </form>
    </div>
  )
}
