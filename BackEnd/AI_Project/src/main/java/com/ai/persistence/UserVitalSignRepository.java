package com.ai.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ai.domain.UserVitalSign;

public interface UserVitalSignRepository extends JpaRepository<UserVitalSign, Integer> {
	List<UserVitalSign> findByUserCode(String userCode);
	// 해당하는 userCode의 현재 No보다 큰 첫번째 No 값을 반환
	Optional<UserVitalSign> findFirstByUserCodeAndNoGreaterThan(String userCode, int no);

	// 현재 No보다 큰 첫번째 No 값을 반환
	Optional<UserVitalSign> findFirstByNoGreaterThan(int no);
}
