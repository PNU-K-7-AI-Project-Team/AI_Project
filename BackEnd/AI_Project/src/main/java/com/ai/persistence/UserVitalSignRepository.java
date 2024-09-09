package com.ai.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ai.domain.UserVitalSign;

public interface UserVitalSignRepository extends JpaRepository<UserVitalSignRepository, Integer> {
	List<UserVitalSign> findByUserId(String userId);
	List<UserVitalSign> findByUserCode(String userCode);
}
