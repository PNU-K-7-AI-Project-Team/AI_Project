package com.ai.domain;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Board {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	// @Id: 해당 필드가 기본키이다
	// @GeneratedValue(~): 기본 키의 값을 자동으로 생성 (Auto Increment)
	private int idx;
	
	@Column(nullable = false, length = 64)
	// Column: DB 테이블의 열 지정
	// nullable = false (Not Null)
	// length = 글자수 제한
	private String title;
	
	@ManyToOne // 다대일 관계 이 필드가 다른 엔티티와 연결되어있음을 나타냄
    @JoinColumn(name = "usercode", nullable = false) 
	// JoinColumn: 외래키 지정
	// name = userid(DB의 board-userid와 member-userid가 외래키)
	private User member; 
	
	@Column(nullable = false, length = 2000)
	private String content;
	
//	@Column(nullable = false)
//	private int ;
	
	@Builder.Default // 해당 필드의 기본값을 설정
	@Column(nullable = false) 
	private Date createDate = new Date(); // 객체가 생성된 날짜
}
