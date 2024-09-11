package com.ai.config;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.ai.domain.User;
import com.ai.persistence.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CustomHandshakeInterceptor implements HandshakeInterceptor{
	
	private final UserRepository userRepo;
	
	
	 public boolean beforeHandshake(
	            ServerHttpRequest request,
	            ServerHttpResponse response,
	            WebSocketHandler wsHandler,
	            Map<String, Object> attributes) throws Exception {

		 	String userId = request.getURI().getQuery().substring(7);
		 	Optional<User> user = userRepo.findByUserId(userId);
		 	
	       if (user.isPresent()) {
	    	   attributes.put("userCode", user.get().getUserCode());
	    	   attributes.put("role", user.get().getRole());
	    	   return true;
	       } else {
	    	   return false;
	       }
	    }

	@Override
	public void afterHandshake(ServerHttpRequest req, ServerHttpResponse res, WebSocketHandler wsHandler, Exception e) {
		// TODO Auto-generated method stub
		
	}




	
}
