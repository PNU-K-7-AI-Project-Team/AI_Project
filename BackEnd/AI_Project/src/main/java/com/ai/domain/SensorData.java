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
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
public class SensorData {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;
	
	@Column(nullable = false)
	private LocalDate workDate;
	
	@Column(length = 8, nullable = false)
	private String userCode;
	
	@Column(nullable = false)
	private int heartbeat;
	
	@Column(nullable = false, columnDefinition = "DOUBLE(2,1)")
	private double temperature;
	
	@Column(nullable = false, columnDefinition = "DOUBLE(2,1)")
	private double outsideTemperature;
	
	@Column(nullable = false)
	private double latitude;
	
	@Column(nullable = false)
	private double longitude;
	
	@Column(nullable = false, columnDefinition = "DATETIME(3)")
//	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
	private LocalDateTime vitalDate;
	
	@Column(nullable = false)
	private float x;
	
	@Column(nullable = false)
	private float y;
	
	@Column(nullable = false)
	private float z;
}
