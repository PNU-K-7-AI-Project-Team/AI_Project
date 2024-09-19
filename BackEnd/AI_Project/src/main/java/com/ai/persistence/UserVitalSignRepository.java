package com.ai.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ai.domain.UserVitalSign;


public interface UserVitalSignRepository extends JpaRepository<UserVitalSign, Integer> {
	List<UserVitalSign> findByUserCode(String userCode);
	// 해당하는 userCode의 현재 No보다 큰 첫번째 No 값을 반환
	
//	@Query
//	(value = "SELECT uvs.no, uvs.heartbeat, uvs.user_code " +
//			 "FROM user_vital_sign uvs " +
//			 "WHERE uvs.user_code = ? AND uvs.no > ? " +
//			 "ORDER BY uvs.no ASC " +
//			 "LIMIT 1",
//	 nativeQuery = true) // 현재 No보다 큰 첫번째 No를 한개만 조회 LIMIT 1이니까 
//	Optional<UserVitalSignProjection> userHearbeat(String userCode, int lastNo);

	UserVitalSign findById(int no);
	

//	List<UserVitalSignProjection> findTop1ByUserCodeAndNoGreaterThanOrderByNoAsc(String userCode, int no);
	
}


