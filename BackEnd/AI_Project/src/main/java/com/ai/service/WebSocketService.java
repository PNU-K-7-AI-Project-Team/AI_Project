package com.ai.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.ai.config.WebSocketConfig;
import com.ai.domain.ConnectNo;
import com.ai.domain.RiskPrediction;
import com.ai.domain.VitalGyro;
import com.ai.dto.VitalDTO;
import com.ai.repository.ConnectNoRepository;
import com.ai.repository.RiskPredictionRepository;
import com.ai.repository.VitalGyroRepository;
import com.ai.util.NoSingleton;

import com.ai.dto.FlaskRequestDTO;

import com.ai.dto.FlaskResponseDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WebSocketService {
	
	private final RiskPredictionRepository riskRepo;
	private final VitalGyroRepository vgRepo;
	
	private final NoSingleton noSingleton; // 싱글톤: DB에서 한행씩 읽는 no
	private final WebSocketConfig wsConfig;
	private final FlaskService flaskService;
	private final WebClient webClient;
	
	@Scheduled(fixedRate = 1000)
	public void pushData() throws IOException {
		// DB의 user_vital_sign 테이블에서 no를 1씩 증가시키며 해당 행 조회 후 vitalSign 인스턴스에 저장
		int no = noSingleton.getNo();
		System.out.println("no: " + no);

		// (최종)Vital Gyro 통합 테이블
		VitalGyro vg = vgRepo.findById(no).orElse(null);
		
		if(vg == null) {
			return; // DB 데이터가 더이상 조회 안되면 종료
		}
		
		// (최종)Vital DTO
		VitalDTO vitalDTO = VitalDTO.builder()
				.workDate(vg.getWorkDate())
				.userCode(vg.getUserCode())
				.heartbeat(vg.getHeartbeat())
				.temperature(vg.getTemperature())
				.outsideTemperature(vg.getOutsideTemperature())
				.latitude(vg.getLatitude())
				.longitude(vg.getLongitude())
				.build();
					
		// vitalDTO 프론트에 전송(DB에 있는 생체신호 1행씩 20ms 주기로 전송)
		wsConfig.sendPushMessage(vitalDTO);
		
		// (최종) Flask에 전송할 DTO
		FlaskRequestDTO fqDTO = FlaskRequestDTO.builder()
				.userCode(vg.getUserCode())
				.workDate(vg.getWorkDate())
				.temperature(vg.getTemperature())
				.outsideTemperature(vg.getOutsideTemperature())
				.gyroData(new float[] {vg.getX(), vg.getY(), vg.getZ()})
				.build();
		
		CompletableFuture<RiskPrediction> futureResponse = sendDataToFlaskAsync(fqDTO);
		
		futureResponse.thenAccept(rp -> {
			FlaskResponseDTO frDTO = FlaskResponseDTO.builder()
					.workDate(vg.getWorkDate())
					.userCode(vg.getUserCode())
					.riskFlag(rp.getRiskFlag())
					.build();
			
			wsConfig.sendPushMessage(frDTO);
			
			riskRepo.save(rp);
		}).exceptionally(ex -> {
			System.err.println("에러 발생: " + ex.getMessage());
			return null;
		});
		
		
		
		// 행 갯수 세는 싱글턴 객체
		noSingleton.incrementNo();
	}
	
	private CompletableFuture<RiskPrediction> sendDataToFlaskAsync(FlaskRequestDTO fqDTO) {
		return webClient.post()
				.uri("http://192.168.0.127:5000")
				.bodyValue(fqDTO)
				.retrieve()
				.bodyToMono(RiskPrediction.class)
				.toFuture();
	}
	
}
