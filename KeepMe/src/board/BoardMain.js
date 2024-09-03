import React from 'react'
import styles from './BoardMain.module.css'
import HeaderForm from '../header/HeaderForm'
import SideBarForm from '../sideBar/SideBarForm'
export default function BoardMain() {
  return (
    <div className={styles.bg}>
      <div>
          <HeaderForm/>
        </div>
        <div>
          <SideBarForm/>
        </div> 
    </div>
  )
}
