package com.ai.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.ai.domain.RiskPrediction;
import com.ai.dto.FlaskRequestDTO;
import com.ai.dto.GyroAndVitalDTO;
import com.ai.dto.TestGyroDTO;
import com.ai.repository.RiskPredictionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FlaskService {
	
	// HTTP 통신을 위한 클래스(HTTP 요청시 사용)
	// 서버의 요청하고 응답을 받는 역할을 동시에 수행하는 객체
	private final RestTemplate restTemplate; 

	// testGyroDTO 전송
	public RiskPrediction sendDataToFlask(FlaskRequestDTO dto) {
		String flaskUrl = "http://192.168.0.131:5000";
		
		try {
			RiskPrediction response = restTemplate.postForObject(flaskUrl, dto, RiskPrediction.class);
			if (response != null) {
				// postForObject(url, requestObject, responseType)
				// url: 요청보낼 Flask 서버의 url
				// requestObject: Flask 서버로 보낼 요청 데이터 (DTO나 객체)
				// responseType: Flask 서버에서 반환된 응답을 변환할 객체 타입
				// 응답 받은 데이터를 DB에 저장
				RiskPrediction rp = RiskPrediction.builder()
						.userCode(response.getUserCode())
						.registerDate(response.getRegisterDate())
						.predictionRiskLevel(response.getPredictionRiskLevel())
						.build();
				
				return rp;
			} else {
				// 로그 또는 예외 처리: Flask로부터 응답이 없는 경우
	            System.out.println("Flask 서버로부터 응답을 받지 못했습니다.");
	            return null;
			}

		} catch (RestClientException e) {
			// RestTemplate 에러 처리 (예: 서버가 응답하지 않음)
			System.out.println("Flask 서버 요청 중 오류 발생: " + e.getMessage());
		}
		return null;
	}
	

}
