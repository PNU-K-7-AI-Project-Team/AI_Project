package com.ai.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ai.domain.UserVitalSign;
import com.ai.dto.GetBoardsDTO;

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
	Optional<UserVitalSign> findHeartbeatUserCode(String userCode, int no);

	// 현재 No보다 큰 첫번째 No 값을 반환
	Optional<UserVitalSign> findFirstByNoGreaterThan(int no);
	
	
	@Query // 데이터 조회 및 전체 데이터 개수를 계산하는 SQL 쿼리문 정의 어노테이션
	(value = "SELECT idx, user_code, title, content, user_id, user_name, dept, create_date, update_date FROM board", // db에서 조회할 데이터  
     countQuery = "SELECT count(*) FROM board",  // 해당 테이블 데이터 전체 개수를 계산
     nativeQuery = true) // 해당 쿼리가 실제 SQL 쿼리임을 지정
	Page<GetBoardsDTO> findBoardsDTO(Pageable pageable);
}


