package com.ai.dto;

import java.util.Date;

import com.ai.domain.Dept;
import com.ai.domain.Gender;
import com.ai.domain.Position;
import com.ai.domain.Region;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyInfoDTO {
	private String userId;
	private String userName;
	private Position position;
	private Dept dept;
	private Region region;
	private Date dateOfBirth;
	private Gender gender;
	private Date createDate;
}

