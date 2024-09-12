import React from 'react'
import styles from './WorkerBoard.module.css'

export default function WorkerBoard() {
    return (
        <div>
            <h3 className={styles.text}>작업자 관리</h3>
            <div className={styles.workerContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>이름</th>
                            <th>입사일</th>
                            <th>부서</th>
                            <th>업무</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>홍길동</td>
                            <td>2024-01-01</td>
                            <td>개발부</td>
                            <td>개발</td>
                            <td>재직</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}
