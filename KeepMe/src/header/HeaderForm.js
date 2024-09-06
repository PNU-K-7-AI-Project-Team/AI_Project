import React from 'react'
import styles from './HeaderForm.module.css'
import { Link } from 'react-router-dom';
export default function HeaderForm() {
  const handleLogout = () => {
    window.location.href = '/logout';
  }
  return (
    <div className={styles.headerbar}>
    <button className={styles.logout} onClick={handleLogout}>
     로그아웃
    </button>
    </div>
  )
}
