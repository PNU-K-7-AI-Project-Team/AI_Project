package com.ai.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// 공지사항
@Getter @Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Board {
	// 기본키, AutoIncrement
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
	private int idx;
	
	@Column (nullable = false)
	private String userCode;
	
	@Column (length = 100, nullable = false)
	private String title;
	
	@Column (length = 2000, nullable = false)
	private String content;
	
	@Column (length = 45, nullable = false)
	private String userId;
	
	@Column (length = 45, nullable = false)
	private String userName;
	
	@Enumerated(EnumType.STRING)
	private Dept dept;

}
