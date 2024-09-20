package com.ai.service;



import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


import com.ai.config.WebSocketConfig;
import com.ai.dao.UserVitalSign;
import com.ai.dto.PushDTO;
import com.ai.persistence.UserVitalSignRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WebSocketService {
	
	private final UserVitalSignRepository vitalRepo;
	private final WebSocketConfig wsConfig;
	private int no = 1722608;
//	private int no = 1915326;
	
	// userCode별로 마지막 처리된 no 값을 저장하는 맵
	// 서버 초기화시에만 해당 맵은 비워지고 다시 처음 No부터 읽어옴
	// 대신 단순한 연결을 끊을시에는 해당 맵의 키 밸류들은 유지가 됨
//	private final Map<String, Integer> lastNoMap = new HashMap<>(); 
	// 각 userCode(키), no(밸류)가 저장된 맵
	// 마지막으로 보낸 userCode의 no를 저장하기 위해서
	// final로 선언한 이유: userCode(키)는 불변이고 no(밸류)는 변하도록
	
//	@Scheduled(fixedRate = 3000)
//	public void pushData() {
//		for (WebSocketSession session : WebSocketConfig.getClients()) { // 현재 접속한 클라이언트 세션을 모두 가져와서 session에 저장
//			Role role = (Role) session.getAttributes().get("role"); // 해당 session의 Role 추출
//
//			if (role != null) { // role이 존재하면,
//				if (role == Role.ROLE_ADMIN) { // 관리자 권한일때, (모든 사용자의 데이터 전송)
//					List<User> users = userRepo.findAll(); // 모든 유저 정보를 DB에서 가져와서 users 리스트에 각 user 객체별로 저장
//					for (User user : users) { // 모든 유저 정보가 저장된 users 리스트에서 각 유저 정보를 user에 저장 
//						String currentUserCode = user.getUserCode(); // userCode 추출
//						int lastNo = lastNoMap.getOrDefault(currentUserCode, 0); 
//						// getOrDefault: lastNoMap의 해당 키(currentUserCode)의 값을 반환, 존재하지않으면 0을 반환
//						// 처음 서버를 켜면 lastNoMap에 아무것도 들어있지 않으니까 0을 반환
//						UserVitalSignProjection vitalSign = vitalRepo.userHearbeat(currentUserCode, lastNo)
//																	     .orElse(null);
//						// userHeartbeat의 쿼리문의 SELECT로 가져온 userCode, no, heartbeat 데이터를 vitalSign 객체에 저장
//						// (Optional 타입이라서 쿼리문 SELECT에서 데이터 존재하지않으면 null일 수도 있음)
//						if (vitalSign != null) { // vitalSign이 존재하면, 
//							sendAndUpdate(session, vitalSign, currentUserCode); // FE에 데이터 전송
//						}
//					}
//				} else if (role == Role.ROLE_USER) { // 사용자 권한일때, (해당 사용자의 데이터만 전송)
//					String userCode = (String) session.getAttributes().get("userCode"); // 접속한 session의 userCode 추출
//					int lastNo = lastNoMap.getOrDefault(userCode, 0);  
//					UserVitalSignProjection vitalSign = vitalRepo.userHearbeat(userCode, lastNo)
//					                                       .orElse(null);
//					if (vitalSign != null) {
//						sendAndUpdate(session, vitalSign, userCode);
//					}
//				}
//			}
//		}
//	}
	@Scheduled(fixedRate = 200) // 0.2초 간격으로 전송
	public void pushData() {
		
		System.out.println("no: " + no);
		
		// DB의 vitalSign에서 no를 1씩 증가시키며 해당 행 조회 후 vitalSign에 저장
		UserVitalSign vitalSign = vitalRepo.findById(no++); 
		
		
		
		PushDTO pushDto = PushDTO.builder() // 보낼 데이터 값들
				//.no(vitalSign.getNo()) // 해당 객체의 현재 No 
                  .userCode(vitalSign.getUserCode())  // 접속한 세션에서 추출한 userCode
                  .heartbeat(vitalSign.getHeartbeat()) // 해당 객체의 heartbeat
                  .build();
		wsConfig.sendPushMessage(pushDto); // FE에 웹소켓으로 정보를 보냄
	}
	
//	// UserVitalSignProjection 처리 
//	private void sendAndUpdate(WebSocketSession session, UserVitalSignProjection vitalSign, String userCode) {
//	    PushDTO pushDto = PushDTO.builder() // 보낼 데이터 값들
//	    						 // .no(vitalSign.getNo()) // 해당 객체의 현재 No 
//	                             .userCode(userCode)  // 접속한 세션에서 추출한 userCode
//	                             .heartbeat(vitalSign.getHeartbeat()) // 해당 객체의 heartbeat
//	                             .build();
//	    wsConfig.sendPushMessage(pushDto); // FE에 웹소켓으로 정보를 보냄
//	    lastNoMap.put(userCode, vitalSign.getNo()); // lastNoMap에 userCode(키), No(밸류)를 저장 (마지막으로 보낸 no를 저장(기억)하기 위해)
//	}
	
//	// 안쓰는데 일단 리스트 쓸지도 모르니 남겨놓음
//	private void sendAndUpdate(WebSocketSession session, List<UserVitalSignProjection> vitalSigns, String userCode) {
//		// vitalSigns: userCode별 모든 vitalSign 객체들을 저장한 리스트
//	    for (UserVitalSignProjection vitalSign : vitalSigns) { // 리스트에 저장된 객체들을 
//	        sendAndUpdate(session, vitalSign, userCode); // 기존 단일 메서드 재사용
//	    }
//	}
	
	
}
