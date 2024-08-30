package com.ai.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.ai.config.filter.JWTAuthFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Autowired
	private AuthenticationConfiguration authConfig;

	@Bean
	PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()); // CSRF 보호 비활성화
		
		http.authorizeHttpRequests(auth->auth
				.requestMatchers("/write**").authenticated()
				.requestMatchers("/edit**").authenticated()
				.anyRequest().permitAll());
		http.formLogin(frmLogin->frmLogin.disable());
		// disable: 기본제공하는 로그인폼 사용안함
		http.httpBasic(basic->basic.disable());
		// HTTP Basic 인증 사용안함
		
		http.sessionManagement(sm->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		// 세션이 응답할때까지만 유지되고 삭제됨(주로 JWT 토큰방식에서 사용)
		
		// 로그아웃 처리
		http.logout(logout->logout
				.invalidateHttpSession(true) //로그아웃 시 세션 무효화
				.deleteCookies("JSESSIONID") // JSESSIONID라는 키의 쿠키를 삭제
				.logoutSuccessUrl("/index")); // 로그아웃 후 인덱스페이지로 이동
		
		// 필터 추가: 현재는 사용자 정의 필터를 추가함
		http.addFilter(new JWTAuthFilter(authConfig.getAuthenticationManager()));
		
		return http.build();
	}
	


}
