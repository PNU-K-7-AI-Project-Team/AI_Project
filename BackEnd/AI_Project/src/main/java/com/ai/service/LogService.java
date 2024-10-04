package com.ai.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ai.config.WebSocketConfig;
import com.ai.domain.Log;
import com.ai.repository.LogRepository;
import com.ai.repository.RiskPredictionRepository;
import com.ai.util.NoSingleton;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogService {
	private final LogRepository logRepo;

	// 해당 userCode의 이전 데이터 조회
	public List<Log> getPreviousLogs(String userCode) {
		return logRepo.findByUserCode(userCode);
	}
}
