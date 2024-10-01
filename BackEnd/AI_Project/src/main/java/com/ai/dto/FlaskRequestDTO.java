package com.ai.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//Flask 전송용 DTO (생체+예측)
@Getter @Setter @ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FlaskRequestDTO {
	private String userCode;
	private double heartbeat;
	private double temperature;
	private double outsideTemperature;

	@JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
	private LocalDateTime vitalDate;
	private float x;
	private float y;
	private float z;
	private String predictedActivity;
	
}
