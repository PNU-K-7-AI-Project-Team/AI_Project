package com.ai.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ai.domain.SensorData;

public interface SensorDataRepository extends JpaRepository<SensorData, Integer> {
	Optional<SensorData> findById(int no);
}
