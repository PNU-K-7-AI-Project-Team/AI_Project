import React, { useState } from 'react'
import styles from './MainPage.module.css'
import NaverMap from '../map/NaverMap'
import PCountBar from '../peopleCountBor/PCountBar'
import DangerList from '../dangerList/DangerList'
import UserGraph from '../userGraph/UserGraph'
import BoardList from '../board/BoardList'


export default function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className={styles.bg}>
        <h3 className={styles.text}>전체 현장 관리</h3>
        <div>
          <PCountBar/>
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
          <BoardList />
        </div>
    </div>
  )
}
