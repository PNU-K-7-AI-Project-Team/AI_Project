import React from 'react'
import styles from './WorkerBoard.module.css'
import HeaderForm from '../header/HeaderForm'
import SideBarForm from '../sideBar/SideBarForm'
export default function WorkerBoard() {
    return (
        <div className={styles.bg}>
            <div>
                <HeaderForm />
            </div>
            <div>
                <SideBarForm />
            </div>
        </div>
    )
}
