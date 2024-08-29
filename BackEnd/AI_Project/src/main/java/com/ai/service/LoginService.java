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
public class LoginService {
	private final UserRepository userRepo;
	private final PasswordEncoder passwordEnc;

	// 로그인
	public ResponseEntity<?> login(String inputId, String inputPassword) {
		Optional<User> inputUser = userRepo.findByUserId(inputId);
		System.out.println("Input Password: " + inputPassword);
		// DB에 입력된 아이디가 없는 경우
		if (inputUser.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
		}
		User user = inputUser.get(); // DB에 존재하는 ID를 user에 저장
		
		 System.out.println("Stored Password: " + user.getPassword());
		 
		// DB에 입력된 비밀번호와 일치하지 않는 경우
		if (!passwordEnc.matches(inputPassword, user.getPassword())) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다.");
	    } // 일치하지않으면 응답 객체 상태를 인증되지않은상태와 비밀번호가 일치하지않습니다 본문을 반환
		 // passwordEnc.matches: 입력한 비밀번호를 해싱해서 DB에 저장된 해싱된 비밀번호와 일치하는지 확인
		
		// 인증 정보 설정
		Authentication auth = new UsernamePasswordAuthenticationToken(
			user.getUserCode(), null, user.getAuthorities()
		);
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		return ResponseEntity.ok("로그인 성공");
	}
	
	// 프론트에서 받은 토큰으로 유저 id 반환
	public String getUserIdFromToken() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		// SecurityContextHolder: SecurityContext 저장소
		// SecurityContext: 사용자 인증정보(Authentication) 보관
		// Authentication: 유저의 아이디, 비밀번호, 권한 등이 포함
		if (auth != null && auth.isAuthenticated()) {
			// auth != null: 사용자 인증 정보가 존재하면서, 
			// isAuthenticated: 사용자가 인증된 상태일때,
			return auth.getName(); // getName(): 사용자의 아이디를 반환
		}
		return null; // 인증 정보가 존재하지않으면, null값 반환
	}
	
	// 회원가입 메서드
	public void signUp(User user) {
		userRepo.save(User.builder() // userRepository에 user 정보를 저장
					  .userId(user.getUserId())
					  .password(passwordEnc.encode(user.getPassword())) // encode를 통해 암호화
					  .userName(user.getUserName())
					  .role(Role.USER).build());
	}
	
	// 중복 아이디 체크
	public ResponseEntity<?> checkId(User user) {
		// ResponseEntity 요청에 대한 응답 객체
		if (userRepo.findById(user.getUserCode()).isPresent()) { 
			return ResponseEntity.status(HttpStatus.CONFLICT).body("중복된 ID");
			// 응답 객체의 상태가 CONFLICT(충돌)상태로 body(본문)의 내용 "중복된 ID"를 화면에 출력하도록 반환
		} else {
			return ResponseEntity.ok("사용 가능한 ID");
		}
	}
	
}
