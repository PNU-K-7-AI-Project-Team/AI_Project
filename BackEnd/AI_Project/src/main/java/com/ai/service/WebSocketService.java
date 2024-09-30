package com.ai.service;

import java.io.IOException;
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
import com.ai.dto.GyroDTO;
import com.ai.dto.VitalAndGyroDTO;

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
//	private int no = 1;
	
	@Scheduled(fixedRate = 20)
	public void pushData() throws IOException {
		// DB의 user_vital_sign 테이블에서 no를 1씩 증가시키며 해당 행 조회 후 vitalSign 인스턴스에 저장
		int no = noSingleton.getNo();
		System.out.println("no: " + no);
		

		
		// 생체 데이터 전송 DTO (Flask에 testGyro + vitalSignDTO 먼저 전송 후 응답 받으면,
		// 1. vitalSignDTO를 프론트에 먼저 전송
		// 2. riskPredictionDTO를 프론트에 전송
		UserVitalSign vs = vitalRepo.findById(no).orElse(null);
		VitalSignDTO vitalSignDTO = VitalSignDTO.builder()
				.userCode(vs.getUserCode())
				.heartbeat(vs.getHeartbeat())
				.latitude(vs.getLatitude())
                .longitude(vs.getLongitude())
                .temperature(vs.getTemperature())
                .build();
		
		// (테스트용: 연결되면 추후에 삭제) 
//		TestGyro testGyro = testGyroRepo.findById(no).orElse(null);
//		TestGyroDTO testGyroDTO = TestGyroDTO.builder()
//				.userCode(testGyro.getUserCode())
//				.x(testGyro.getX())
//				.y(testGyro.getY())
//				.z(testGyro.getZ())
//				.vitalDate(testGyro.getVitalDate())
//				.predictedActivity(testGyro.getPredictedActivity()) // 테스트용 행동라벨을 임의로 붙임
//				.build();
		
		// (진짜 보낼 것)Flask로 전송하는 testGyro
//		Gyro gyro = gyroRepo.findById(no).orElse(null);
//		GyroDTO gyroDTO = GyroDTO.builder()
//				.userCode(gyro.getUserCode())
//				.x(gyro.getX())
//				.y(gyro.getY())
//				.z(gyro.getZ())
//				.vitalDate(gyro.getVitalDate())
//				.build();
		
		// (진짜 보낼 것)Flask로 전송하는 vitalSign + gyro 데이터 결합한 DTO
//		VitalAndGyroDTO vitalAndGyroDTO = VitalAndGyroDTO.builder()
//				.gyroDTO(gyroDTO)
//				.vitalSignDTO(vitalSignDTO)
//				.build();
		
		// (진짜 보낼것) 결합된 DTO flask 요청 및 응답
//		RiskPrediction rp = flaskService.sendDataToFlask(vitalAndGyroDTO);
		
//		// 위험예측결과 전송
//		RiskPredictionDTO rpDTO = RiskPredictionDTO.builder()
//				.userCode(rp.getUserCode())
//				.registerDate(rp.getRegisterDate())
//				.predictionRiskLevel(rp.getPredictionRiskLevel())
//				.build();
				
		// 1. vitalSign 프론트에 전송
		wsConfig.sendPushMessage(vitalSignDTO);
				
		// (진짜 보낼 것)2. riskPrediction 프론트에 전송
//		wsConfig.sendPushMessage(rpDTO);
			
		// 프론트에 메시지전송을 마친 후 riskRepo를 DB에 저장
//		riskRepo.save(rp);	
		
		// 행 갯수 세는 싱글턴 객체
		noSingleton.incrementNo();
	}
	
}
