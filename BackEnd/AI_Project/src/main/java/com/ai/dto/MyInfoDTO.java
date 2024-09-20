package com.ai.dto;

import java.util.Date;

import com.ai.dao.Dept;
import com.ai.dao.Gender;
import com.ai.dao.Position;
import com.ai.dao.Region;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
@Builder
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

