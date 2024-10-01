package com.ai.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// 생체 + 예측분석 DTO (프런트 전송용)
@Getter @Setter @ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FlaskResponseDTO {
	
	
	private String userCode;
	private double heartbeat;
	private double temperature;
	private double outsideTemperature;
	private double latitude;
	private double longitude;
	
	// JSON 직렬화, 역직렬화 
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	private LocalDateTime vitalDate;
	
	@JsonSerialize(using = LocalDateSerializer.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	private LocalDate workDate;
	
	private int predictionRiskLevel;
}
