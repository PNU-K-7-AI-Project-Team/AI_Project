package com.ai.controller_advice;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice // 사용자 정의 전역 예외처리 
public class GlobalExceptionHandler extends Exception{
	
	@ExceptionHandler
	public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException ex) {
		return new ResponseEntity<>("요청값을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
	}
}
