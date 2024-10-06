package com.ai.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ai.domain.Log;
import com.ai.repository.LogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogService {
	private final LogRepository logRepo;

	// 해당 userCode의 이전 데이터 조회
	public List<Log> getUserLogs(String userCode, LocalDate workDate) {
		return logRepo.findByUserCode(userCode, workDate);
	}
	
	// 모든 작업자의 이전 데이터 조회
	public List<Log> getAllLogs() {
		return logRepo.findAll();
	}
}
