package com.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//BE가 연결된 FE에게 전달하는 데이터 클래스 정의
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReportDTO {
	private int no;
	private String workDate;
	private String userCode;
	private double heartbeat;
	private double temperature;
	private double outsideTemperature;
	private double latitude;
	private double longitude;
	private int deviceBattery;
	private int deleteYn;
}
