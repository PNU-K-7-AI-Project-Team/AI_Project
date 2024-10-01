package com.ai.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.ai.config.WebSocketConfig;
import com.ai.domain.ConnectNo;
import com.ai.domain.Gyro;
import com.ai.domain.RiskPrediction;
import com.ai.domain.TestGyro;
import com.ai.domain.UserVitalSign;
import com.ai.dto.VitalSignDTO;
import com.ai.repository.ConnectNoRepository;
import com.ai.repository.GyroRepository;
import com.ai.repository.RiskPredictionRepository;
import com.ai.repository.TestGyroRepository;
import com.ai.repository.UserVitalSignRepository;
import com.ai.util.NoSingleton;
import com.ai.dto.RiskPredictionDTO;
import com.ai.dto.TestGyroDTO;
import com.ai.dto.GyroAndVitalDTO;

import com.ai.dto.RiskAndVitalDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WebSocketService {
	
	private final UserVitalSignRepository vitalRepo;
	private final GyroRepository gyroRepo;
	private final RiskPredictionRepository riskRepo;
	private final TestGyroRepository testGyroRepo;
	
	private final NoSingleton noSingleton; // 싱글톤: DB에서 한행씩 읽는 no
	private final WebSocketConfig wsConfig;
	private final FlaskService flaskService;
	
	@Scheduled(fixedRate = 1000)
	public void pushData() throws IOException {
		// DB의 user_vital_sign 테이블에서 no를 1씩 증가시키며 해당 행 조회 후 vitalSign 인스턴스에 저장
		int no = noSingleton.getNo();
		System.out.println("no: " + no);
		
		// 생체 데이터 전송 DTO (Flask에 testGyro + vitalSignDTO 먼저 전송 후 응답 받으면,
		// 1. vitalSignDTO를 프론트에 먼저 전송
		// 2. riskPredictionDTO를 프론트에 전송
		UserVitalSign vs = vitalRepo.findById(no).orElse(null);
	
		// (테스트용: 연결되면 추후에 삭제) 
		TestGyro testGyro = testGyroRepo.findById(no).orElse(null);

		
		// Flask로 전송하는 (생체 + Gyro) 데이터 DTO
		GyroAndVitalDTO gyroAndVitalDTO = GyroAndVitalDTO.builder()
				.userCode(vs.getUserCode())
				.temperature(vs.getTemperature())
				.outsideTemperature(vs.getOutsideTemperature())
				.vitalDate(vs.getVitalDate())
				.x(testGyro.getX())
				.y(testGyro.getY())
				.z(testGyro.getZ())
				.build();
				
		
		// (진짜 보낼것) 결합된 DTO flask 요청 및 응답
		RiskPrediction rp = flaskService.sendDataToFlask(gyroAndVitalDTO);
		
		
		// Vital + RiskPrediction(생체신호+예측분석 DTO) 프론트 전송용
		RiskAndVitalDTO rvDTO = RiskAndVitalDTO.builder()
				.workDate(vs.getWorkDate())
				.userCode(vs.getUserCode())
				.heartbeat(vs.getHeartbeat())
				.temperature(vs.getTemperature())
				.outsideTemperature(vs.getOutsideTemperature())
				.latitude(vs.getLatitude())
				.longitude(vs.getLongitude())
				.vitalDate(vs.getVitalDate())
				.predictionRiskLevel(rp.getPredictionRiskLevel())
				.build();
				
		// (진짜 보낼 것)2. riskPrediction 프론트에 전송
		wsConfig.sendPushMessage(rvDTO);
			
		// 프론트에 메시지전송을 마친 후 riskRepo를 DB에 저장
		riskRepo.save(rp);	
		
		// 행 갯수 세는 싱글턴 객체
		noSingleton.incrementNo();
	}
	
}
