package com.ai.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TestGyro {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;
	
	@Column(nullable = false)
	private LocalDate workDate;
	
	@Column(length = 8, nullable = false)
	private String userCode;
	
	@ManyToOne
    @JoinColumn(name = "userCode", referencedColumnName = "userCode", insertable = false, updatable = false)
    private User user; // User 엔티티와의 관계
	
	@Column(nullable = false)
	private float x;
	
	@Column(nullable = false)
	private float y;
	
	@Column(nullable = false)
	private float z;
	
	@Column(nullable = false)
	private LocalDateTime vitalDate;
	
	@Column(length = 45, nullable = false)
	private String predictedActivity;
	

}
