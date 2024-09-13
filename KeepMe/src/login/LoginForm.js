import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'
export default function LoginForm({ setAuth }) {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const url = process.env.REACT_APP_BACKEND_URL;
    
    let token = "";


    const login = async (e) => {
        e.preventDefault();//폼 제출 시 기본 동작을 막음
        try {
            const response = await axios.post(`${url}login`, 
                {
                  userId,
                  password,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  }
                }
              );
            if (response.status === 200) {//서버가 성공적인 응답을 반환했는지 확인, HTTP 상태 코드 200은 성공을 의미
                token = response.headers.get("Authorization");
                console.log("response.data.userId",response.data.userId)
                
                sessionStorage.setItem("userid", userId);
                sessionStorage.setItem("token", token);
                console.log("sessionStorage",sessionStorage)
                setAuth(true);//인증 상태를 true로 설정
                navigate('/')
            } else {
                console.error('Login Failed');
            }
        } catch (error) {
            console.error('Login Failed');
        }
    }
    const joinclick = () => {
        navigate('/signup')
    }


    return (
        <div className={styles.bg}>
            <div className={styles.LoginForm}>
                <h1 className={styles.name}>login</h1>
                <form onSubmit={login}>
                    <div>
                        {/* <label className={styles.UseridT}>Userid</label> */}
                        <input type='userId' className={styles.id} placeholder='아이디' value={userId} onChange={(e) => setUserId(e.target.value)} />
                    </div>
                    <div>
                        {/* <label className={styles.PasswordT}>Password</label> */}
                        <input type='password' className={styles.password} placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button className={styles.login} type="submit">
                            로그인 
                        </button>
                    </div>
                    <div>
                        <button className={styles.join} onClick={joinclick} >
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}