package com.ai.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ai.service.LoginService;

import lombok.RequiredArgsConstructor;

@Controller // 웹 요청 컨트롤러 어노테이션
@RequiredArgsConstructor // final 필드나 @NonNull이 붙은 필드의 생성자를 자동 생성(의존성 주
public class LoginController {
	
	private final LoginService ls;
	
	// 로그인 요청 처리
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestParam String inputId, @RequestParam String inputPassword) {
		ResponseEntity<?> resp = ls.login(inputId, inputPassword);
		
		if (resp.getStatusCode() == HttpStatus.OK) {
			return ResponseEntity.ok("로그인 성공");
		} else {
			return ResponseEntity.status(resp.getStatusCode()).body((String) resp.getBody());
		}
	}
	
}
