package com.ai.config;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

import com.ai.dto.PushDTO;

// WebSocket 연결을 설정
@Configuration
@EnableWebSocket	// Boot WebSocket 활성화
@RequiredArgsConstructor
public class WebSocketConfig extends TextWebSocketHandler implements WebSocketConfigurer  {

	// 연결된 클라이언트들을 저장하는 Set
	private static Set<WebSocketSession> clients = Collections.synchronizedSet(new HashSet<WebSocketSession>());

	private final CustomHandshakeInterceptor customInter;
	
	// WebSocket 연결명 설정 (ws://localhost:8080/pushservice) ==> WebSocketConfigurer
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(this, "/pushservice") // 엔드포인트 /pushservice로 지정
				.setAllowedOrigins("*") // 모든 컴퓨터에서 접근 가능
				.addInterceptors(customInter);
	}
	
	
	// Client가 접속 시 호출되는 메서드
	@Override 
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		clients.add(session); // Set에 해당 session 저장
	    System.out.println(session + " 클라이언트 접속");
	}
	
	// Client가 접속 해제 시 호출되는 메서드
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println(session + " 클라이언트 접속 해제");
		clients.remove(session);
	}		

	// Client에서 메시지가 왔을 때 호출되는 메서드 -> 채팅과 같은 형태의 기능을 추가하지 않는다면 필요없는 메소드이다.
	@Override // 클라이언트가 보낸 메시지를 처리하는 용도
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message : " + message.getPayload());
	}
	
	// FE에게 정보를 푸시하는 메소드 
	public void sendPushMessage(PushDTO pushDto) {
		// 연결된 클라이언트가 없으면 그냥 리턴
	    if (clients.size() == 0)	return;

	    // 자바 객체를 JSON 문자열로 변환
	    // PushDTO 객체를 JSON으로 변환
	    ObjectMapper objectMapper = new ObjectMapper();
	    String msg;
		try { // objectMapper를 통한 JSON 형태로 직렬화
			msg = objectMapper.writeValueAsString(pushDto);
		} catch (JsonProcessingException e) {
			System.out.println("JSON Error:" + e.getMessage());
			return;
		}

		// FE에 전송할 JSON 메시지객체 생성
		// TextMessage는 WebSocket을 통해 클라이언트에게 전송할 수 있는 메시지 포맷
		TextMessage message = new TextMessage(msg);

		// 블럭안에 코드를 수행하는 동안 map 객체에 대한 다른 스레드의 접근을 방지한다.
				synchronized (clients) {
				    for(WebSocketSession sess: clients) {
						// 모든 클라이언트 세션에 sendMessage를 통해 해당 직렬화한 msg를 전송
				    	try {
				    		sess.sendMessage(message);
				    	} catch (IOException e) {
				    		System.out.println(sess.getRemoteAddress() + ":" + e.getMessage());
				    		// 예외 발생 시 클라이언트의 원격 주소와 예외 메시지를 콘솔에 출력
				    	}
				    }
				}
	}
	
	// 현재 웹소켓 서버에 연결된 모든 클라이언트 세션을 반환
    public static Set<WebSocketSession> getClients() {
        return clients;
    }

}
