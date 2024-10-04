package com.ai.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.ai.config.WebSocketConfig;
import com.ai.domain.Log;
import com.ai.domain.RiskPrediction;
import com.ai.domain.SensorData;

import com.ai.repository.LogRepository;
import com.ai.repository.RiskPredictionRepository;
import com.ai.repository.SensorDataRepository;

import com.ai.util.NoSingleton;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ai.dto.FlaskRequestDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WebSocketService {
	
	private final RiskPredictionRepository riskRepo;
	private final LogRepository logRepo;
	private final SensorDataRepository sensorRepo;
	
	private final NoSingleton noSingleton; // 싱글톤: DB에서 한행씩 읽는 no
	private final WebSocketConfig wsConfig;
	private final WebClient webClient = WebClient.create();
	
	@Scheduled(fixedRate = 1000)
	public void pushData() throws IOException {
		// DB의 user_vital_sign 테이블에서 no를 1씩 증가시키며 해당 행 조회 후 vitalSign 인스턴스에 저장
		
		int no = noSingleton.getNo();
		System.out.println("no: " + no);

		// (최종)Vital Gyro 통합 테이블
		SensorData sd = sensorRepo.findById(no).orElse(null);
		
		if(sd == null) {
			return; // DB 데이터가 더이상 조회 안되면 종료
		}
		
		// (최종) Flask에 전송할 DTO
		FlaskRequestDTO fqDTO = FlaskRequestDTO.builder()
				.userCode(sd.getUserCode())
				.workDate(sd.getWorkDate())
				.gyroData(new float[] {sd.getX(), sd.getY(), sd.getZ()})
				.heartbeat(sd.getHeartbeat())
				.temperature(sd.getTemperature())
				.outsideTemperature(sd.getOutsideTemperature())
				.vitalDate(sd.getVitalDate())
				.longitude(sd.getLongitude())
				.latitude(sd.getLatitude())
				.build();

		// Flask 요청(fqDTO) 전송 후 응답 frDTO로 변환
		sendDataToFlaskAsync(fqDTO).thenAccept(rp -> {
			if (rp != null && rp.getUserCode() != null) {
				// 저장 프로시저 메서드
				riskRepo.upsertRiskPrediction(rp.getUserCode(), rp.getWorkDate(), 
						rp.getRiskFlag(), rp.getHeartbeat(),rp.getTemperature(), rp.getOutsideTemperature(), 
						rp.getLatitude(), rp.getLongitude(), rp.getActivity(), rp.getVitalDate());
				
				//현재 데이터
				RiskPrediction existData = riskRepo.findByUserCode(rp.getUserCode()).orElse(null);
				
				// 변경여부
				boolean isChanged = false; 
				
				if (existData != null) {
					 if (existData.getRiskFlag() != rp.getRiskFlag()
						 || existData.getHeartbeat() != rp.getHeartbeat()
						 || existData.getTemperature() != rp.getTemperature()
						 || existData.getOutsideTemperature() != rp.getOutsideTemperature()
						 || existData.getLatitude() != rp.getLatitude()
						 || existData.getLongitude() != rp.getLongitude()
						 || existData.getWorkDate() != rp.getWorkDate()
						 || existData.getActivity().equals(rp.getActivity())
				                ) {
			                isChanged = true;
		            }
				}
				if (isChanged) {
					sendPushMessage(rp);
				}
				
				
			}		
		}).exceptionally(ex -> {
			System.err.println("에러 발생: " + ex.getMessage());
			return null;
		});
		
		// 행 갯수 세는 싱글턴 객체
		noSingleton.incrementNo();
	}
	
	private CompletableFuture<RiskPrediction> sendDataToFlaskAsync(FlaskRequestDTO fqDTO) {
		return webClient.post() // POST 요청 준비
				.uri("http://192.168.0.129:5000") // 요청 보낼 flask 서버
				.bodyValue(fqDTO) // Flask 서버에 보낼 데이터
				.retrieve() // 응답을 받아오는 메서드
				.bodyToMono(RiskPrediction.class) // 응답 받은 객체를 RiskPrediction 객체로 변환
				.toFuture(); // CompletableFutuer로 변환
	}
	
	// FE에게 정보 전송 메소드 
		public void sendPushMessage(Object rp) {
			
			Set<WebSocketSession> clients = wsConfig.getClients();
			
			// 연결된 클라이언트가 없으면 그냥 리턴
		    if (clients.size() == 0)	return;

		    // 자바 객체를 JSON 문자열로 변환
		    // PushDTO 객체를 JSON으로 변환
		    ObjectMapper objectMapper = new ObjectMapper();
		    String msg = null;
		    RiskPrediction frontData = null;

			try { 
				frontData = (RiskPrediction) rp;
				msg = objectMapper.writeValueAsString(rp);
			} catch (JsonProcessingException e) {
				System.out.println("JSON Error:" + e.getMessage());
				return;
			}
			
			// FE에 전송할 JSON 메시지객체 생성
			// TextMessage는 WebSocket을 통해 클라이언트에게 전송할 수 있는 메시지 포맷
			TextMessage message = new TextMessage(msg);
			
			// 블럭안에 코드를 수행하는 동안 map 객체에 대한 다른 스레드의 접근을 방지한다.
				synchronized (clients) { // 연결된 모든 세션을 담은 컬렉션
					// 연결된 모든 세션을 WebsockSession 객체에 반복문으로 저장
					// 메시지 전송
					for (WebSocketSession sess : clients) {
						Map<String, Object> map = sess.getAttributes();
						String userCode = (String) map.get("userCode");
						
						if (frontData != null) {
							if (userCode.equals("0") || userCode.equals(frontData.getUserCode())) {
								sendMessageToClient(sess, message, userCode, msg);
							} 
						} 
					}
			    }
		}
	
		// 클라이언트 데이터 전송 메서드
		private void sendMessageToClient(WebSocketSession sess, TextMessage message, String userCode, String msg) {
		    try {
		        System.out.println(userCode + ", " + msg);
		        sess.sendMessage(message);
		    } catch (IOException e) {
		        System.out.println(sess.getRemoteAddress() + ": " + e.getMessage());
		    }
		}
		


}
