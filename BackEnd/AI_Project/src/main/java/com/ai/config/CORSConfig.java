package com.ai.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // 설정 클래스 정의
public class CORSConfig implements WebMvcConfigurer { // CORSConfig: CORS 설정을 위한 클래스
	@Override // WebMvcConfigurer 해당 인터페이스로 Srping MVC 설정을 커스터마이징
	public void addCorsMappings(CorsRegistry registry) {
		// addCorsMappings: CORS 매핑 추가하는 메서드
		// CorsRegistry: 해당 객체를 사용해서 CORS 설정 구성
		// NonNull: registry의 파라미터가 null이 아니어야한다
		registry.addMapping("/login")  // 해당 경로에 CORS 적용 "/**"는 모든 경로에 적용 
				.allowCredentials(true) 
				// 클라이언트가 credential(쿠키, HTTP 인증정보 등)을 요청에 포함 할수 있도록 허용
				.allowedHeaders(HttpHeaders.CONTENT_TYPE)
				// 클라이언트가 "요청"에 포함 할 수 있는 헤더를 CONTENT_TYPE(예: 일반 텍스트, JSON데이터 등)으로 제한
				.exposedHeaders(HttpHeaders.AUTHORIZATION)
				// 클라이언트가 "응답"에 접근 할 수 있는 헤더를 Authorization으로 지정
				// 다른 도메인에서 오는 HTTP 응답을 특정 헤더의 클라이언트가 접근하는것을 차단한다.
				// 그래서 지정한 "응답" 헤더를 보여주니까 undefined가 뜨지 않음
				.allowedMethods(HttpMethod.GET.name(), // 클라이언트에게 허용되는 메서드를 GET, POST로 제한
								HttpMethod.POST.name())
				.allowedOrigins( // 허용할 도메인 설정
						"http://localhost:3000");
	}
}
