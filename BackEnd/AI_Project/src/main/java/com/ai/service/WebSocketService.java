package com.ai.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.ai.config.WebSocketConfig;
import com.ai.persistence.UserVitalSignRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WebSocketService {
	private final UserVitalSignRepository uvRepo; // 생체신호 정보 DB
	private WebSocketConfig wsConfig; // 웹소켓 설정
	
	@Scheduled(fixedRate = 2);
	
	
	
	
	
}
