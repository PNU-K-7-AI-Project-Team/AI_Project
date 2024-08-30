import React from 'react'
import { useState, useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
export default function ResisterForm() {
    const [username, setUsername] = useState('');
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [isUserid, setisuserid] = useState(null);//아이디 중복검사

    const checkUserid = async()=>{
        try{
            const response = await axios.get('/resister', {
                params: {username: username},
            });
            setisuserid(response.data);//중복 여부 업데이트
        }catch(error){
            console.error('Userid check failed:', error);
        }
    }

    const resister = async(e)=>{
        e.preventDefault();//기본 동작(페이지 새로고침)을 막음
        try{
            const response = await axios.post('/auth/resister',{
                username,
                userid,
                password,
            });
        }catch(error){
            console.error('Resister failed:',error)
        };
    };

  return (
    <div>
      
    </div>
  )
}
