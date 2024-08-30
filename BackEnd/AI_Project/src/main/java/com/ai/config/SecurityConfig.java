package com.ai.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(); // 비밀번호 해싱 암호화 객체
	}
	
	// Bean 어노테이션으로 등록된 함수들은 ioc컨테이너라는 중간 매개체에 함수들이 저장되어
	@Bean // 서로 다른 클래스에서 자유롭게 사용이 가능하게 만든다..
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http.authorizeHttpRequests(security->security
				.requestMatchers("/userPage/**").authenticated()
				// authenticated(): 인증된 사용자면 해당 경로에 접근 가능
				.requestMatchers("/adminPage/**").hasRole("ADMIN")
				// hasRole: 해당 경로로 시작하는 모든 요청은 ADMIN 역할을 가진 사용자만 접근 가능
				.anyRequest().permitAll() // 위 지정한 경로말고 모든 경로는 누구나 접근 가능
				);
		http.csrf(cf->cf.disable()); // CSRF 보호 비활성화
		
		// authenticated()로 인해 미인증 사용자가 인증된 사용자만 들어갈수있는 경로에
		// 접근하면 form.loginPage로 지정한 경로로 리디렉션
		http.formLogin(form->form
				.loginPage("/login")
				.permitAll() // 사용자 정의 로그인 경로로 이동
				.defaultSuccessUrl("/loginSuccess", true)
				.failureUrl("/loginError")
				);
		// permitAll: 누구나 접근 가능
		
		
		
		http.httpBasic(basic->basic.disable());
		// HTTP Basic 인증 사용안함
		
		http.sessionManagement(sm->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		// 세션이 응답할때까지만 유지되고 삭제됨(주로 JWT 토큰방식에서 사용)

		http.logout(logout->logout
				.invalidateHttpSession(true) // 세션을 유효하지않게함
				.deleteCookies("JSESSIONID") // JSESSIONID(세션아이디) 쿠키 삭제
				.logoutSuccessUrl("/login")); // 로그아웃 성공시 리디렉션할 경로
		return http.build(); // 보안 구성 설정 완료
	}
	
	
	
	
}
