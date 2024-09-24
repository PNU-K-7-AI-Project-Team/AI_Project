package com.ai.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter @Setter @ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class RiskPrediction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;
	
	@Column(length = 8, nullable = false)
	private String userCode;
	
	@Column(nullable = false)
	private LocalDateTime registerDate;
	
	@Column(nullable = false)
	private int predictionRiskLevel;
}
