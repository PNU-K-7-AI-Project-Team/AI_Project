import React from 'react'
import styles from './TemperatureG.module.css'
export default function TemperatureG({onClose}) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.container} onClick={e=>e.stopPropagation()}>
      </div>
    </div>
  )
}
