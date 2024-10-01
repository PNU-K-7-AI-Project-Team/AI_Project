package com.ai.repository;

import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ai.domain.UserVitalSign;
import com.ai.dto.VitalDTO;


public interface UserVitalSignRepository extends JpaRepository<UserVitalSign, Integer> {
	List<UserVitalSign> findByUserCode(String userCode);

	// 모든 사용자의 이전 데이터 (관리자)
	// 최적화 문제로 이전 데이터를 모두 가져올수가 없음(가장 최근 300개의 행만 임의로 가져오도록)
	@Query
	(value = "SELECT user_code, work_date, heartbeat, " +
			 "temperature, outside_temperature, latitude, " +
			 "longitude " +
			 "FROM user_vital_sign " +
			 "WHERE no < ? " + 
			 "ORDER BY no DESC " +
			 "LIMIT 300",
	 nativeQuery = true)
	List<Object[]> findPreviousAllNo(int currentNo);
	
	// 사용자의 이전 데이터 (사용자)
	// 최적화 문제로 이전 데이터를 모두 가져올수가 없음(가장 최근 300개의 행만 임의로 가져오도록)
	@Query
	(value = "SELECT * FROM user_vital_sign " +
	         "WHERE user_code = ? AND no < ? " +
			 "ORDER BY no DESC " +
	         "LIMIT 300",
     nativeQuery = true)
	List<VitalDTO> findPreviousUserNo(String userCode, int currentNo);
	

	Optional<UserVitalSign> findById(int no);
	


	
}


