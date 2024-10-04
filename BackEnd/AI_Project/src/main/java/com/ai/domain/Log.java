package com.ai.domain;

import java.time.LocalDate;
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
public class Log {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;
	
	@Column(nullable = false, length = 8)
	private String userCode;
	
	@Column(nullable = false)
	private LocalDate workDate;
	
	@Column(nullable = false)
	private int riskFlag;
	
	@Column(nullable = false)
	private double heartbeat;
	
	@Column(nullable = false)
	private double temperature;
	
	@Column(nullable = false)
	private double outsideTemperature;
	
	@Column(nullable = false)
	private double latitude;
	
	@Column(nullable = false)
	private double longitude;
	
	@Column(length = 45, nullable = false)
	private String activity;
	
	@Column(nullable = false)
	private LocalDateTime vitalDate;
	

}
