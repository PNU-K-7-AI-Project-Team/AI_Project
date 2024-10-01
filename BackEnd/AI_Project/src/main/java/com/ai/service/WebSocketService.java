package com.ai.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

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
	
	@Scheduled(fixedRate = 20)
	public void pushData() throws IOException {
		// DB의 user_vital_sign 테이블에서 no를 1씩 증가시키며 해당 행 조회 후 vitalSign 인스턴스에 저장
		int no = noSingleton.getNo();
		System.out.println("no: " + no);

		
//		// (최종)Vital Gyro 통합 테이블
		VitalGyro vg = vgRepo.findById(no).orElse(null);
		
//		List<Float> gyroData = Arrays.asList(vg.getX(), vg.getY(), vg.getZ()); // x, y, z 값을 리스트로 묶음
		
		// (최종) Flask에 전송할 DTO
		FlaskRequestDTO fqDTO = FlaskRequestDTO.builder()
				.userCode(vg.getUserCode())
				.workDate(vg.getWorkDate())
				.temperature(vg.getTemperature())
				.outsideTemperature(vg.getOutsideTemperature())
				.gyroData(new float[] {vg.getX(), vg.getY(), vg.getZ()})
				.build();
		
		// (최종) 결합된 DTO flask 요청 후 응답
		RiskPrediction rp = flaskService.sendDataToFlask(fqDTO);
			
		// (최종)Vital + RiskPrediction(생체신호+예측분석 DTO) 프론트 전송용
		FlaskResponseDTO frDTO = FlaskResponseDTO.builder()
				.workDate(vg.getWorkDate())
				.userCode(vg.getUserCode())
				.heartbeat(vg.getHeartbeat())
				.temperature(vg.getTemperature())
				.outsideTemperature(vg.getOutsideTemperature())
				.latitude(vg.getLatitude())
				.longitude(vg.getLongitude())
				.vitalDate(vg.getVitalDate())
				.riskFlag(rp.getRiskFlag())
				.build();
					
		// (진짜 보낼 것)2. riskPrediction 프론트에 전송
		wsConfig.sendPushMessage(frDTO);
			
		// 프론트에 메시지전송을 마친 후 riskRepo를 DB에 저장
		riskRepo.save(rp);	
		
		// 행 갯수 세는 싱글턴 객체
		noSingleton.incrementNo();
	}
	
}
