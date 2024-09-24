package com.ai.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@AllArgsConstructor
@NoArgsConstructor
public class RiskPredictionDTO {
	private int no;
	
	private String userCode;
	
	private LocalDateTime registerDate;
	
	private int predictionRiskLevel;
}
