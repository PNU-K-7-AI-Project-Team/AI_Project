package com.ai.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
	
	@Column (length= 8, nullable = false)
	private String userCode;
	
	@Column (length = 100, nullable = false)
	private String title;
	
	@Column (length = 2000, nullable = false)
	private String content;
	
	@Column (length = 45, nullable = false)
	private String userId;
	
	@Column (length = 45, nullable = false)
	private String userName;
	
	@Column (nullable = false)
	@Enumerated(EnumType.STRING)
	private Dept dept;
	
	@CreationTimestamp
	@Column(nullable = false, columnDefinition = "DATETIME")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime createDate;
	
    // User 테이블과의 다대일 관계 설정, CascadeType.REMOVE 추가
    @ManyToOne(cascade = CascadeType.REMOVE) // User 삭제 시 관련된 Board도 삭제
    @JoinColumn(name = "userCode", referencedColumnName = "userCode", insertable = false, updatable = false)
    private User user; // User 객체를 참조하는 필드

}
