import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import styles from './RegisterForm.module.css'
export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [isUserid, setisuserid] = useState(null);//아이디 중복검사
    const navigate = useNavigate();
    const url = process.env.REACT_APP_BACKEND_URL;

    // const checkUserid = async()=>{
    //     try{
    //         const response = await axios.get('/register', {
    //             params: {username: username},
    //         });
    //         setisuserid(response.data);//중복 여부 업데이트
    //     }catch(error){
    //         console.error('Userid check failed:', error);
    //     }
    // }

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
                <input type='userid' className={styles.userid} placeholder='UserId' value={userId} onChange={(e)=>{setUserId(e.target.value); setisuserid(null)}}/>
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
