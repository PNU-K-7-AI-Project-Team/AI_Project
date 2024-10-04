package com.ai.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ai.domain.RiskPrediction;

import jakarta.transaction.Transactional;

public interface RiskPredictionRepository extends JpaRepository<RiskPrediction, String> {
	

	@Query
	(value = "SELECT * FROM risk_prediction WHERE user_code = ?",
	nativeQuery = true)
	Optional<RiskPrediction> findByUserCode(String userCode);
	
	@Transactional
	@Modifying
	@Query(value = "CALL upsert_risk_prediction(:user_code, :work_date, :risk_flag, :heartbeat, :temperature, :outside_temperature, :latitude, :longitude, :activity, :vital_date)", nativeQuery = true)
	void upsertRiskPrediction(
	        @Param("user_code") String userCode,
	        @Param("work_date") LocalDate workDate,
	        @Param("risk_flag") int riskFlag,
	        @Param("heartbeat") double heartbeat,
	        @Param("temperature") double temperature,
	        @Param("outside_temperature") double outsideTemperature,
	        @Param("latitude") double latitude,
	        @Param("longitude") double longitude,
	        @Param("activity") String activity,
	        @Param("vital_date") LocalDateTime vitalDate);
	}
