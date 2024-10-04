package com.ai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ai.domain.Log;

public interface LogRepository extends JpaRepository<Log, Integer> {
	List<Log> findByUserCode(String userCode);
}
