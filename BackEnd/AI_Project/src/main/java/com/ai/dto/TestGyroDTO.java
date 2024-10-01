package com.ai.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@Builder
@AllArgsConstructor // 모든 필드를 매개변수로 받는 생성자를 자동 생성
@NoArgsConstructor // 매개변수가 없는 기본 생성자를 자동 생성
public class TestGyroDTO {
	private int no;
	private LocalDate workDate;
	private String userCode;
	private float x;
	private float y;
	private float z;
	private String predictedActivity; // 테스트용에는 행동 라벨을 붙여놓음
	
}
