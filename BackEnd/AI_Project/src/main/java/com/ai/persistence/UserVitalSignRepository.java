package com.ai.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ai.domain.UserVitalSign;
import com.ai.dto.GetBoardsDTO;
import com.ai.dto.UserVitalSignProjection;


public interface UserVitalSignRepository extends JpaRepository<UserVitalSign, Integer> {
	List<UserVitalSign> findByUserCode(String userCode);
	// 해당하는 userCode의 현재 No보다 큰 첫번째 No 값을 반환
	
	@Query
	(value = "SELECT uvs.no, uvs.heartbeat, uvs.user_code " +
			 "FROM user_vital_sign uvs " +
			 "WHERE uvs.user_code = ? AND uvs.no > ? " +
			 "ORDER BY uvs.no ASC " +
			 "LIMIT 1",
	 nativeQuery = true)
	Optional<UserVitalSignProjection> UserHearbeat(String userCode, int no);

	// 현재 No보다 큰 첫번째 No 값을 반환
	@Query
	(value = "SELECT uvs.no, uvs.heartbeat, uvs.user_code " +
			 "FROM user_vital_sign uvs " +
			 "WHERE uvs.no > ?1 " +
			 "ORDER BY uvs.no ASC " +
			 "LIMIT 1",
	 nativeQuery = true)
	List<UserVitalSignProjection> AllUserHeartbeat(int no);
	
}


