package com.ai.dto;

// Projection: 네이티브 쿼리로 사용하고싶은 컬럼만 매핑하기 위한 DTO와 유사한 객체 느낌
public interface UserVitalSignProjection {
	int getNo();
	int getHeartbeat();
	String getUserCode();
	
}
