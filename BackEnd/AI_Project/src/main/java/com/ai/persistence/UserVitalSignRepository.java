package com.ai.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ai.domain.UserVitalSign;

public interface UserVitalSignRepository extends JpaRepository<UserVitalSign, Integer> {
	List<UserVitalSign> findByUserCode(String userCode);
}
