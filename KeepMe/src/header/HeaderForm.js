import React, { useState } from 'react';
import styles from './HeaderForm.module.css';
import Mypage from '../myPage/Mypage';
import MyPageAuth from '../myPage/MypageAuth';

export default function HeaderForm({ onClose }) {
  const [isMypageOpen, setIsMypageOpen] = useState(false);
  const [isMypageAuthOpen, setIsMypageAuthOpen] = useState(false);

  const openMypageAuth = () => {
    setIsMypageAuthOpen(true);
  };

  const closeMypageAuth = () => {
    setIsMypageAuthOpen(false);
  };

  const openMypage = () => {
    setIsMypageAuthOpen(false); // 인증 모달을 닫고 마이페이지 열기
    setIsMypageOpen(true);
  };

  const closeMypage = () => {
    setIsMypageOpen(false);
  };

  const handleLogout = () => {
    if(window.confirm('정말로 로그아웃 하시겠습니까?')){
      window.location.href = '/logout';
      sessionStorage.clear();
    }
  };

  return (
    <div className={styles.headerbar}>
      <button className={styles.mypage} onClick={openMypageAuth}>
        마이페이지
      </button>

      {/* MyPageAuth 컴포넌트가 모달처럼 동작 */}
      {isMypageAuthOpen && <MyPageAuth onSuccess={openMypage} onClose={closeMypageAuth} />}

      {/* MyPage 컴포넌트 */}
      {isMypageOpen && <Mypage onClose={closeMypage} />}

      <button className={styles.logout} onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}
