package com.ai.repository;

import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ai.domain.UserVitalSign;


public interface UserVitalSignRepository extends JpaRepository<UserVitalSign, Integer> {
	List<UserVitalSign> findByUserCode(String userCode);
	// 해당하는 userCode의 현재 No보다 큰 첫번째 No 값을 반환
	
	// 사용자의 이전 데이터 (사용자)
	@Query
	(value = "SELECT * FROM user_vital_sign " +
	         "WHERE user_code = ? AND no < ?",
     nativeQuery = true)
	List<UserVitalSign> findPreviousUserNo(String userCode, int currentNo);
	
	// 모든 사용자의 이전 데이터 (관리자)
	@Query
	(value = "SELECT * FROM user_vital_sign " +
			 "WHERE no < ?",
	 nativeQuery = true)
	List<UserVitalSign> findPreviousAllNo(int currentNo);
	
//	@Query
//	(value = "SELECT uvs.no, uvs.heartbeat, uvs.user_code " +
//			 "FROM user_vital_sign uvs " +
//			 "WHERE uvs.user_code = ? AND uvs.no > ? " +
//			 "ORDER BY uvs.no ASC " +
//			 "LIMIT 1",
//	 nativeQuery = true) // 현재 No보다 큰 첫번째 No를 한개만 조회 LIMIT 1이니까 
//	Optional<UserVitalSignProjection> userHearbeat(String userCode, int lastNo);

	Optional<UserVitalSign> findById(int no);
	


	
}


