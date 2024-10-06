//package com.ai.service;
//
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;
//
//import com.ai.domain.SensorData;
//import com.ai.dto.FlaskRequestDTO;
//import com.ai.repository.SensorDataRepository;
//import com.ai.websocket.FlaskWebSocketClient;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//public class SensorScheduler {
//	
//	private final SensorDataRepository sensorRepo;
//	private final FlaskWebSocketClient flaskWs;
//	
//	private int no = 1;
//	
//	@Scheduled(fixedRate = 20)
//	public void sendSensorData() {
//		System.out.println("no: " + no);
//		
//		SensorData sd = sensorRepo.findById(no).orElse(null);
//		
//		if(sd != null) {
//			FlaskRequestDTO fqDTO = FlaskRequestDTO.builder()
//					.userCode(sd.getUserCode())
//					.workDate(sd.getWorkDate())
//					.gyroData(new float[] {sd.getX(), sd.getY(), sd.getZ()})
//					.heartbeat(sd.getHeartbeat())
//					.temperature(sd.getTemperature())
//					.outsideTemperature(sd.getOutsideTemperature())
//					.vitalDate(sd.getVitalDate())
//					.longitude(sd.getLongitude())
//					.latitude(sd.getLatitude())
//					.build();
//			flaskWs.sendMessageToFlask(fqDTO);
//		}
//	}
//	
//	
//}
