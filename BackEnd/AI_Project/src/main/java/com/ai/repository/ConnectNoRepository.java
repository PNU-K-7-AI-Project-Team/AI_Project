package com.ai.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ai.domain.ConnectNo;

public interface ConnectNoRepository extends JpaRepository<ConnectNo, String>{
	
	@Query
	(value = "SELECT * FROM connect_no WHERE user_code = ?",
	nativeQuery = true)
	Optional<ConnectNo> findByUserCode(String userCode);
}
