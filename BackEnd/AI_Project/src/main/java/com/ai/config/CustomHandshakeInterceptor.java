//package com.ai.config;
//
//import java.util.Map;
//
//import org.springframework.http.server.ServerHttpRequest;
//import org.springframework.http.server.ServerHttpResponse;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.socket.WebSocketHandler;
//import org.springframework.web.socket.server.HandshakeInterceptor;
//
//import com.ai.domain.User;
//import com.ai.persistence.UserRepository;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//
//@RequiredArgsConstructor
//@Component
//public class CustomHandshakeInterceptor implements HandshakeInterceptor {
//	
//	private final UserRepository userRepo;
//	
//	@Override
//	public boolean beforeHandshake(HttpServletRequest request,
//								   HttpServletResponse response,
//								   Object wsHandler,
//								   Map<String, Object> attributes) throws Exception {
//		
//		// Authorization이 해당 키인 value를 token에 저장
//		String authHeader = request.getHeader("Authorization"); 
//		
//		if (authHeader != null && authHeader.startsWith("Bearer ")) {
//			String token = authHeader.substring(7); // 0~6까지 자르고 그 다음 7번째 문자열부터 끝까지
//			User user = getUserFromToken();
//			if (user != null) {
//				attributes.put("user", user);
//				return true;
//			}
//		}
//		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//		return false;
//	}
//	
//	@Override
//	public void afterHandshake(ServerHttpRequest arg0, ServerHttpResponse arg1, WebSocketHandler arg2, Exception arg3) {
//		// TODO Auto-generated method stub
//		
//	}
//	
//	// 로그인 후 얻은 토큰으로 해당 아이디의 User 객체를 추출
//	private User getUserFromToken() {
//		// SecurityContextHolder: 로그인하면 토큰이 나오는데, 
//		// 토큰에 들어있는 정보를 바탕으로 Spring Security가 인증 정보를 저장하는 객체
//		// 인증정보(아이디,비밀번호 등)를 가져와서 authentication에 저장
//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();	
//		// 인증정보가 있으면서 인증되었다면(아이디,비밀번호가 DB에 있다면)		
//		if (authentication != null && authentication.isAuthenticated()) {
//			String userId = authentication.getName(); // 인증 정보의 아이디를 추출해서 userId에 저장 
//			if (userId != null) { // userId가 존재하면,
//				return userRepo.findByUserId(userId).orElse(null); // 해당 userId의 user 객체를 반환
//			}
//		}
//		return null;
//	}
//
//
//
//
//}
