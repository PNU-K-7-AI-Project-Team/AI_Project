package com.ai;

import java.security.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.ai.domain.Gender;
import com.ai.domain.Role;
import com.ai.domain.User;
import com.ai.persistence.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserInit implements ApplicationRunner{
	private final UserRepository userRepo;
	private final PasswordEncoder passwordEnc;
	
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		// 현재 날짜를 생년월일로 지정

		userRepo.save(User.builder()
						  .userId("admin")
						  .password(passwordEnc.encode("11"))
						  .userName("관리자")
						  .role(Role.ADMIN)
						  .position("과장")
						  .department("영업1팀")
						  .region("서울")
						  .dateOfBirth(new Date())
						  .gender(Gender.M)
						  .createdAt(new Date())
						  .updatedAt(new Date())
						  .build()
						  
				);
	}
}
