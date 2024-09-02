package com.ai.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ai.domain.Board;

public interface BoardRepository extends JpaRepository<Board, Integer> {
	
}
