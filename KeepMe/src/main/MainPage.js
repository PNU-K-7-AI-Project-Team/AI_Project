import React from 'react'
import SideBarForm from '../sideBar/SideBarForm'
import HeaderForm from '../header/HeaderForm'
import styles from './MainPage.module.css'
import NaverMap from '../map/NaverMap'
export default function MainPage() {
  return (
    <div className={styles.bg}>
          <HeaderForm/>
          <SideBarForm/>
        
        
        <div className='flex'>
          {/* <NaverMap/> */}
        </div>
        <div>
        </div>
    </div>
  )
}
