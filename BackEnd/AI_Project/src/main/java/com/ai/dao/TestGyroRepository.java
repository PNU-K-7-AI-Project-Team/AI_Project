package com.ai.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ai.domain.TestGyro;

public interface TestGyroRepository extends JpaRepository<TestGyro, Integer>{
	Optional<TestGyro> findById(int no);
}
