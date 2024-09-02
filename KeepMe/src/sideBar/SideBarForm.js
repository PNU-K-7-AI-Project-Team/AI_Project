import React from 'react'
import styles from './SideBarForm.module.css'; // CSS Modules 파일 import
export default function SideBarForm() {

  return (
    <div className={styles.sidebar}>
      <form>
        <div className={styles.formGroup}>
            <h1 className={styles.keepme}>Keep me</h1>
        </div>
        <button className={styles.button}>공지사항</button>
      </form>
    </div>
  )
}
