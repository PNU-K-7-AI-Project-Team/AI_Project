import React from 'react'
import styles from './PCountBar.module.css'
export default function PCountBar({userCount, todayCount}) {


    return (
        <div>
            <div className={styles.all}>
                <h3 className={styles.h3All}>현재 인원</h3>
                <p className={styles.pAll}>{userCount}</p>
            </div>
            <div className={styles.today}>
                <h3>정상 인원</h3>
                <p className={styles.pToday}>{userCount}</p>
            </div>
            <div className={styles.good}>
                <h3>주의 인원</h3>
            </div>
            <div className={styles.bad}>
                <h3>위험 인원</h3>
            </div>

        </div>

    )
}
