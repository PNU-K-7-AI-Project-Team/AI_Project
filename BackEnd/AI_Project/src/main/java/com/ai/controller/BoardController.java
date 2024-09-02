package com.ai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ai.domain.Board;
import com.ai.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BoardController {
	
	private final BoardService bs; 
	// final 선언해서 RequiredArgs에 따라 의존성 주입되어 BoardService의 모든 메서드 사용 가능 
	
	// 게시판 출력
	@GetMapping("/board")
	public ResponseEntity<?> getBoard( 
            @PageableDefault(page = 0, 
            				 size = 10,
            				 sort = "idx",
            				 direction = Sort.Direction.DESC)
            Pageable pageable)
	// BoardService의 Pageable에서 계산된 전체 데이터 개수를 기반으로
	// PageableDefault를 통해 첫페이지, 페이지당 항목수, 기본정렬기준, 정렬방향을 설정
    {
        Page<Board> boards = bs.getBoards(pageable);
        return ResponseEntity.ok(boards);
    };
    
    // 게시물 조회
    @GetMapping("/board/{idx}") 
    public ResponseEntity<?> getBoard(@PathVariable int idx) {
    	// @PathVariable: URL 경로의 변수 {idx}를 메서드의 파라미터로 변환해줌
    	try {
    		Board board = bs.getBoard(idx);
        	return ResponseEntity.ok(board);
    	} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 조회 실패");
		}
    }
    
    // 게시물 등록
    @PostMapping("/board/write")
    public ResponseEntity<?> boardWrite(@RequestBody Board board) {
    	try {
    		bs.boardWrite(board);
    	} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("글쓰기 실패");
		}
    	return ResponseEntity.ok("글쓰기 성공");
    }
    
    
    
    
}
