package com.ai.dao;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter  // 모든 필드에 대한 Getter, Setter 자동 생성
@ToString // 메서드의 toString 메서드를 자동생성 (객체의 문자열 표현 제공)
@Builder // 빌더 패턴 사용해서 객체 생성
@AllArgsConstructor // 모든 필드를 파라미터로 받는 생성자 생성
@NoArgsConstructor // 기본 생성자 생성
@Entity // JPA 엔티티임을 나타낸다. 데이터베이스의 테이블과 매핑된다
public class User {
	@Id
	@Column (length = 8, nullable = false)
	// @Id: 해당 필드가 기본키이다
	// @GeneratedValue(~): 기본 키의 값을 자동으로 생성 (Auto Increment)
	private String userCode;
	
	@Column (length = 45, nullable = false, unique = true) //unique = true: 해당 데이터 중복없음
	private String userId;
	
	@Column (length = 255, nullable = false)
	private String password;
	
	@Column (length = 45, nullable = false)
	private String userName;
	
	@JsonIgnore // JSON 응답에서 제외(클라이언트에게 노출되지않음)
	// JPA가 Enum 타입의 필드를 데이터베이스에 저장
	@Enumerated(EnumType.STRING) // @Builder.Default 
	// Enum의 이름(예: ROLE_USER)을 데이터베이스에 문자열로 저장
	// Builder.Default: 빌더 패턴으로 객체 생성 시 기본값을 Role.ROLE_USER를 가짐 
	@Column(nullable = false)
	private Role role;
	
	@Enumerated(EnumType.STRING)
	private Position position;
	
	@Enumerated(EnumType.STRING)
	private Dept dept;
	
	@Enumerated(EnumType.STRING)
	private Region region;
	
	@Column
	@Temporal(TemporalType.DATE) // Temporal: 날짜타입 정의 어노테이션
	private Date dateOfBirth;
	
	@Enumerated(EnumType.STRING)
	@Column
	private Gender gender; 
	
	//입사일자(계정생성일자)
	@Column(updatable = false, insertable = false)
	@Temporal(TemporalType.TIMESTAMP) 
	private Date createDate;

}

