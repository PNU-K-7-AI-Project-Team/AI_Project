import React from 'react'
import SideBarForm from '../sideBar/SideBarForm'
import HeaderForm from '../header/HeaderForm'
import styles from './MainPage.module.css'
import NaverMap from '../map/NaverMap'
import PCountBar from '../peopleCountBor/PCountBar'
import DangerList from '../dangerList/DangerList'
export default function MainPage() {
  return (
    <div className={styles.bg}>
        <div>
          <PCountBar/>
        </div>
        <div>
          <HeaderForm/>
        </div>
        <div>
          <SideBarForm/>
        </div> 
        <div>
          <NaverMap/>
        </div>
        <div>
          <DangerList/>
        </div>
    </div>
  )
}
