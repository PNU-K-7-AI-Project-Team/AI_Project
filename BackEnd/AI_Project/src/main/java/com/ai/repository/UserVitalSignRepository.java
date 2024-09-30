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
	// 최적화 문제로 이전 데이터를 모두 가져올수가 없음(가장 최근 300개의 행만 임의로 가져오도록)
	@Query
	(value = "SELECT * FROM user_vital_sign " +
	         "WHERE user_code = ? AND no < ? " +
			 "ORDER BY no DESC " +
	         "LIMIT 300",
     nativeQuery = true)
	List<UserVitalSign> findPreviousUserNo(String userCode, int currentNo);
	
	// 모든 사용자의 이전 데이터 (관리자)
	// 최적화 문제로 이전 데이터를 모두 가져올수가 없음(가장 최근 300개의 행만 임의로 가져오도록)
	@Query
	(value = "SELECT * FROM user_vital_sign " +
			 "WHERE no < ? " + 
			 "ORDER BY no DESC " +
			 "LIMIT 300",
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


