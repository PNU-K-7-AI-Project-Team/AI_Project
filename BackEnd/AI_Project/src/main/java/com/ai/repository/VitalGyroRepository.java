package com.ai.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ai.domain.VitalGyro;

// VitalSign + Gyro 데이터 통합 저장소
public interface VitalGyroRepository extends JpaRepository<VitalGyro, Integer> {
	Optional<VitalGyro> findById(int no);
	
	// 모든 사용자의 이전 데이터 (관리자)
	// 최적화 문제로 이전 데이터를 모두 가져올수가 없음(가장 최근 300개의 행만 임의로 가져오도록)
	@Query
	(value = "SELECT * " +
			 "FROM vital_gyro " +
			 "WHERE no < ? " + 
			 "ORDER BY no DESC " +
			 "LIMIT 300",
	 nativeQuery = true)
	List<VitalGyro> findPreviousAllNo(int currentNo);
//	"SELECT no, work_date, user_code, heartbeat, " +
//	 "temperature, outside_temperature, " +
//	 "latitude, longitude " +
	
	// 해당하는 userCode의 현재 No보다 큰 첫번째 No 값을 반환
	
	// 사용자의 이전 데이터 (사용자)
	// 최적화 문제로 이전 데이터를 모두 가져올수가 없음(가장 최근 300개의 행만 임의로 가져오도록)
	@Query
	(value = "SELECT * " +
			 "FROM vital_gyro " +
	         "WHERE user_code = ? AND no < ? " +
			 "ORDER BY no DESC " +
	         "LIMIT 300",
     nativeQuery = true)
	List<VitalGyro> findPreviousUserNo(String userCode, int currentNo);
		
}
