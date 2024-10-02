import React from 'react'
import styles from './HeartBeatG.module.css'
export default function HeartBeatG({onClose}) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.container} onClick={e=>e.stopPropagation()}>
    </div>
    </div>
  )
}
