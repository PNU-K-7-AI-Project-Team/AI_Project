package com.ai.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CORSConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(@NonNull CorsRegistry registry) {
		
		//헤더란? HTTP 요청과 응답시 메타데이터를 전달하는 필드
		registry.addMapping("/**")
				.allowedMethods("*") // 모든 HTTP 메서드 허용
				.exposedHeaders(HttpHeaders.AUTHORIZATION)
				.allowedHeaders("*") // 모든 헤더 허용
				.allowedOrigins("*"); // 접근 가능 ip 주소
		
		registry.addMapping("/login") // 해당 경로 접근시 CORS 정책 적용
				.allowCredentials(true) // 클라이언트가 자격증명(쿠키,인증정보)을 요청하는걸 포함 허용
				.allowedHeaders(HttpHeaders.CONTENT_TYPE) // 클라이언트가 CONTENT_TYPE(JSON형태로반환) 형태만 헤더로 포함할수있음
				.exposedHeaders(HttpHeaders.AUTHORIZATION) // 클라이언트가 응답시 보여지는 헤더
				.allowedMethods( // 해당 메서드 허용
						HttpMethod.GET.name(),
						HttpMethod.POST.name(),
						HttpMethod.OPTIONS.name())
				.allowedOrigins( // 접근 가능한 ip 주소
						"http://localhost:3000", 
						"http://192.168.0.143:3000", 
						"http://192.168.0.131:3000"
						);	
		
		registry.addMapping("/signup/**")
				.allowedHeaders(HttpHeaders.CONTENT_TYPE)
				.allowedMethods(
						HttpMethod.GET.name(),
						HttpMethod.POST.name())
				.allowedOrigins(
						"http://localhost:3000", 
						"http://192.168.0.143:3000", 
						"http://192.168.0.131:3000"
						);
				
		
		
	}
}
