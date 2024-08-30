package com.ai.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ai.domain.User;
import com.ai.service.LoginService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class LoginController {
	
	private final LoginService ls;
	
	
	@GetMapping("/login")
	public void login() {
		System.out.println("로그인 요청");
	}
	
	@GetMapping("/loginSuccess")
	public void loginSuccess() {
	System.out.println("로그인 성공");
	}
	
	@GetMapping("/loginError")
	public void loginError() {
	System.out.println("로그인 실패");
	}
	
	
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody User user) {
		try {
			ls.signUp(user);
			return ResponseEntity.ok("가입 성공");
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body("가입 실패: " + e.getMessage());
		}
	}

}
