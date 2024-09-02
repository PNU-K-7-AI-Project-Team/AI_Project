import React from 'react'
import styles from './HeaderForm.module.css'
export default function HeaderForm() {
  return (
    <div className={styles.headerbar}>
    <button className={styles.logout}>
      로그아웃
      </button>
    </div>
  )
}
