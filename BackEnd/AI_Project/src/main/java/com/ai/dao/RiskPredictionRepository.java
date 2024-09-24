package com.ai.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ai.domain.RiskPrediction;

public interface RiskPredictionRepository extends JpaRepository<RiskPrediction, Integer> {

}
