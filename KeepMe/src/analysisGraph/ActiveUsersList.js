import React from 'react';
import styles from './ActiveUserList.module.css'
function ActiveUsersList({ activeUsers}) {
  return (
    <div className={styles.container}>
      <h3>현재 활동중인 사용자</h3>
      {activeUsers && activeUsers.length > 0? (
        <ul>
        {activeUsers.map((user, index) => (
          <li key={index}>
            {user.userCode} - {user.workDate}
          </li>
        ))}
      </ul>
      ) : (
        <p>활성 사용자가 없습니다.</p>
      )}
      
    </div>
    
  );
}

export default ActiveUsersList;


