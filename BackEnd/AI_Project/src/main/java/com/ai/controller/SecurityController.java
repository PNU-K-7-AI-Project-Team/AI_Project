package com.ai.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityController {

	@GetMapping("/") public String index() { return "index"; }
	@GetMapping("/user") public String user() { return "user"; }
	@GetMapping("/admin") public String admin() { return "admin"; }
	@GetMapping("/login") public String login() { return "로그인 화면"; }
}
