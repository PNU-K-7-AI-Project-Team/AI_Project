package com.ai.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ai.domain.Gyro;

public interface GyroReository extends JpaRepository<Gyro, Integer> {
	Optional<Gyro> findById(int no);
}


