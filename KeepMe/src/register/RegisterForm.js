import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import styles from './RegisterForm.module.css'

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const url = process.env.REACT_APP_BACKEND_URL;

    const checkUserid = async()=>{
        try{
            const response = await axios.post(`${url}signup/checkId`, {
                userId:userId
            });

            if (response.data.isOk) {//백엔드에서 true, false받아옴
               alert('중복 확인', '이미 사용 중인 아이디입니다.');
              } else {
                alert('중복 확인', '사용 가능한 아이디입니다.');
              }
        }catch(error){
            console.error('Userid check failed:', error);
           alert('오류', '중복 확인 중 문제가 발생했습니다. 다시 시도해주세요.');
        }
    }

    const register = async(e)=>{
        e.preventDefault();//기본 동작(페이지 새로고침)을 막음
        try{
            const response = await axios.post(`${url}signup`,{
                username,
                userId,
                password,
            });
            if(response.status === 200){
                navigate('/login')
            }
        }catch(error){
            console.error('Register failed:',error)
        };
    };

  return (
    <div className={styles.RegisterForm}>
        <h1 className={styles.name}>join</h1>
        <form onSubmit={register}>
            <div>
                <input type='username' className={styles.username} placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div>
                <input type='userid' className={styles.userid} placeholder='UserId' value={userId} onChange={(e)=>{setUserId(e.target.value);}}/>
                <button type="button" className={styles.Idcheckbutton} onClick={checkUserid}>
          idcheck
        </button>
            </div>
            <div>
                <input type='password' className={styles.password} placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div>
                <button className={styles.join} type="submit">
                    join
                </button>
            </div>
        </form>
    </div>
  )
}
