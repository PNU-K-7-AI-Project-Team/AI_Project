import React from 'react'
import SideBarForm from '../sideBar/SideBarForm'
import HeaderForm from '../header/HeaderForm'
import styles from './MainPage.module.css'
import NaverMap from '../map/NaverMap'
import PCountBar from '../peopleCountBor/PCountBar'
import DangerList from '../dangerList/DangerList'
import UserGraph from '../userGraph/UserGraph'
import BoardList from '../board/BoardList'
export default function MainPage() {
  return (
    <div className={styles.bg}>
        <h3 className={styles.text}>전체 현장 관리</h3>
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
          <UserGraph/>
        </div>
        <div>
          <DangerList/>
        </div>
        <div>
          <BoardList/>
        </div>
    </div>
  )
}
