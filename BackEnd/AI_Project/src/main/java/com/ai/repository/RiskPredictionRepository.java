package com.ai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ai.domain.RiskPrediction;

public interface RiskPredictionRepository extends JpaRepository<RiskPrediction, Integer> {

	@Query(value = "SELECT * FROM risk_prediction " +
				   "WHERE user_code = ? AND no < ?",
		   nativeQuery = true)
	List<RiskPrediction> findPreviousNo(String userCode, int no);
}
