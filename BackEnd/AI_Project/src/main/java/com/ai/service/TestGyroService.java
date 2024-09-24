package com.ai.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.ai.dao.RiskPredictionRepository;
import com.ai.domain.RiskPrediction;
import com.ai.dto.RiskPredictionDTO;
import com.ai.dto.TestGyroDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestGyroService {
	
	// HTTP 통신을 위한 클래스(HTTP 요청시 사용)
	// 서버의 요청하고 응답을 받는 역할을 동시에 수행하는 객체
	private final RestTemplate restTemplate; 
	private final RiskPrediction riskPrediction;
	private final RiskPredictionRepository riskRepo;
	
	public void sendDataToFlask(TestGyroDTO dto) {
		String flaskUrl = "http://192.168.0.127:5000";
		RiskPredictionDTO response = restTemplate.postForObject(flaskUrl, dto, RiskPredictionDTO.class);
		// postForObject(url, requestObject, responseType)
		// url: 요청보낼 Flask 서버의 url
		// requestObject: Flask 서버로 보낼 요청 데이터 (DTO나 객체)
		// responseType: Flask 서버에서 반환된 응답을 변환할 객체 타입
		
		// 응답 받은 데이터를 DB에 저장
		riskPrediction.setUserCode(response.getUserCode());
		riskPrediction.setRegisterDate(response.getRegisterDate());
		riskPrediction.setPredictionRiskLevel(response.getPredictionRiskLevel());
		
		// Repository를 사용해 DB에 저장
		riskRepo.save(riskPrediction);
	}
}
