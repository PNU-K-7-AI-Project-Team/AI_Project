package com.ai.dto;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BoardPageResponse {
	private List<GetBoardsDTO> content;
    private int totalPages;
    private long totalElements;
    private int size;
    private int number;
    
    public BoardPageResponse(Page<GetBoardsDTO> page) {
        this.content = page.getContent();
        this.totalPages = page.getTotalPages();
        this.totalElements = page.getTotalElements();
        this.size = page.getSize();
        this.number = page.getNumber();
    }
}
