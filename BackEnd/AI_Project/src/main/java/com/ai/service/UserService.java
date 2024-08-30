package com.ai.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ai.domain.Role;
import com.ai.domain.User;
import com.ai.persistence.UserRepository;

import lombok.RequiredArgsConstructor;

@Service // 비즈니스로직 처리 어노테이션
@RequiredArgsConstructor // final 필드의 생성자 자동생성
public class UserService {
	private final UserRepository userRepo;
	private final PasswordEncoder passwordEnc;

	public void save(User user) {
		userRepo.save(user);
	}
	
	
	// 로그인
	public ResponseEntity<?> login(String inputId, String inputPassword) {
		Optional<User> inputUser = userRepo.findByUserId(inputId);
		// DB에 입력된 아이디가 없는 경우
		if (inputUser.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
		}
		User user = inputUser.get(); // DB에 존재하는 ID를 user에 저장

		 
		// DB에 입력된 비밀번호와 일치하지 않는 경우
		if (!passwordEnc.matches(inputPassword, user.getPassword())) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다.");
	    } // 일치하지않으면 응답 객체 상태를 인증되지않은상태와 비밀번호가 일치하지않습니다 본문을 반환
		 // passwordEnc.matches: 입력한 비밀번호를 해싱해서 DB에 저장된 해싱된 비밀번호와 일치하는지 확인
		
		// 인증 정보 설정
		Authentication auth = new UsernamePasswordAuthenticationToken(
			user.getUserCode(), "", user.getAuthorities()
		);
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		return ResponseEntity.ok("로그인 성공");
	}
	

	
}
