package com.ai.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import com.ai.domain.Dept;
import com.ai.domain.Gender;
import com.ai.domain.Region;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


// 마이페이지 DTO
@Getter @Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyInfoDTO {
	private String userId;
	private String userName;
	private Dept dept;
	private Region region;
	private Gender gender;
	private LocalDate createDate;
}

