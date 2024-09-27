package com.ai.util;

import org.springframework.stereotype.Component;

@Component
public class NoSingleton {
	private int no = 1;
	
	public int getNo() {
		return no;
	}
	
	public void incrementNo() {
		no++;
	}
}
