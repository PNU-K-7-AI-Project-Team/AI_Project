package com.ai.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import com.ai.config.WebSocketConfig;
import com.ai.domain.Role;
import com.ai.domain.User;

import com.ai.dto.PushDTO;
import com.ai.dto.UserVitalSignProjection;

import com.ai.persistence.UserRepository;
import com.ai.persistence.UserVitalSignRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WebSocketService {
	
	private final UserRepository userRepo;
	private final UserVitalSignRepository vitalRepo;
	private final WebSocketConfig wsConfig;
	
	// userCode별로 마지막 처리된 no 값을 저장하는 맵
	private final Map<String, Integer> lastNoMap = new HashMap<>();
	
	@Scheduled(fixedRate = 1000)
	public void pushData() {
		for (WebSocketSession session : WebSocketConfig.getClients()) {
			String userCode = (String) session.getAttributes().get("userCode");
			Role role = (Role) session.getAttributes().get("role");

			if (role != null) {
				int lastNo = lastNoMap.getOrDefault(userCode, 0);
				
				if (role == Role.ROLE_ADMIN) { // 관리자 권한
					List<User> users = userRepo.findAll();
					for (User user : users) {
						String currentUserCode = user.getUserCode();
						List<UserVitalSignProjection>nextVitalSign = vitalRepo.AllUserHeartbeat(lastNo);	
						if (nextVitalSign != null) {
							sendAndUpdate(session, nextVitalSign, currentUserCode);
						}
					}
				} else if (role == Role.ROLE_USER) { // 사용자 권한
					UserVitalSignProjection nextVitalSign = vitalRepo.UserHearbeat(userCode, lastNo)
					                                       .orElse(null);
					if (nextVitalSign != null) {
						sendAndUpdate(session, nextVitalSign, userCode);
					}
				}
			}
		}
	}
	
	// 단일 `UserVitalSignProjection` 처리 (오버로딩)
	private void sendAndUpdate(WebSocketSession session, UserVitalSignProjection vitalSign, String userCode) {
	    PushDTO pushDto = PushDTO.builder()
	                             .userCode(userCode)
	                             .heartbeat(vitalSign.getHeartbeat())
	                             .build();
	    wsConfig.sendPushMessage(pushDto);
	    lastNoMap.put(userCode, vitalSign.getNo());
	}
	
	// 다수의 `UserVitalSignProjection` 처리 (오버로딩)
	private void sendAndUpdate(WebSocketSession session, List<UserVitalSignProjection> vitalSigns, String userCode) {
	    for (UserVitalSignProjection vitalSign : vitalSigns) {
	        sendAndUpdate(session, vitalSign, userCode); // 기존 단일 메서드 재사용
	    }
	}
	
	
}
