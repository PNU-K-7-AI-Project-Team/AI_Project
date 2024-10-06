package com.ai.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ai.domain.Log;

// log 테이블
public interface LogRepository extends JpaRepository<Log, Integer> {
	
	@Query // 데이터 조회 및 전체 데이터 개수를 계산하는 SQL 쿼리문 정의 어노테이션
	(value = "SELECT * FROM log " +
			 "WHERE user_code = ? AND work_date = ? " +
			 "ORDER BY no DESC LIMIT 60", // db에서 조회할 데이터  
     nativeQuery = true) // 해당 쿼리가 실제 SQL 쿼리임을 지정
	List<Log> findByUserCode(String userCode, LocalDate workDate);
	
	@Query // 데이터 조회 및 전체 데이터 개수를 계산하는 SQL 쿼리문 정의 어노테이션
	(value = "SELECT * FROM log " +
			 "ORDER BY no DESC LIMIT 1", // db에서 조회할 데이터  
     nativeQuery = true) // 해당 쿼리가 실제 SQL 쿼리임을 지정
	Optional<Log> findByLastNo();
	
}
