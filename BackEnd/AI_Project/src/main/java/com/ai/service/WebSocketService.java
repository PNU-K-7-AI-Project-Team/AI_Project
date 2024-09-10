package com.ai.service;

import org.springframework.stereotype.Service;

import com.ai.config.WebSocketConfig;
import com.ai.dto.PushDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WebSocketService {
	
	private final WebSocketConfig wsConfig;
	
	public void sendAllHeartbeat(PushDTO dto) {
		wsConfig.sendPushMessage(dto);
	}
	
	public void sendHeartbeat(String userCode, double heartbeat) {
		PushDTO dto = PushDTO.builder()
							 .userCode(userCode)
							 .heartbeat(heartbeat)
							 .build();
		wsConfig.sendPushMessage(dto);
	}
	
}
