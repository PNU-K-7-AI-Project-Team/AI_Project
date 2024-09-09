package com.ai.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserVitalSign {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;
	
	@Column(length = 8, nullable = false)
	private String workDate;
	
	@Column(length = 8, nullable = false)
	private String userCode;
	
	@Column
	private int isWear;
	
	@Column
	private double heartbeat;
	
	@Column
	private double temperature;
	
	@Column
	private double outsideTemperature;
	
	@Column
	private double latitude;
	
	@Column
	private double longitude;
	
	@Column
	private int deviceBattery;
	
	@Column
	private int deleteYn;
	
}
