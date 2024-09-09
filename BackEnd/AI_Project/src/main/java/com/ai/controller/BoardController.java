package com.ai.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ai.domain.Board;
import com.ai.dto.WriteUserDTO;
import com.ai.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BoardController {
	
	private final BoardService boardService; 
	// final 선언해서 RequiredArgs에 따라 의존성 주입되어 BoardService의 모든 메서드 사용 가능 
	
	// 게시판 출력
	@GetMapping("/boards")
	public ResponseEntity<?> getBoards( 
			@PageableDefault(page = 0, 
 							 size = 10,
 							 sort = "idx",
 							 direction = Sort.Direction.DESC)Pageable pageable)
	// BoardService의 Pageable에서 계산된 전체 데이터 개수를 기반으로
	// PageableDefault를 통해 첫페이지, 페이지당 항목수, 기본정렬기준, 정렬방향을 설정
    {	
		try {
			return ResponseEntity.ok(boardService.getBoards(pageable));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시판 조회 실패");
		}
        
    };
    
    // 게시물 조회
    @GetMapping("/board") // localhost:8080/board?idx=4 이런식으로 확인 
    public ResponseEntity<?> getBoard(@RequestParam int idx) {
    	// @PathVariable: URL 경로의 변수 {idx}를 메서드의 파라미터로 변환해줌
    	try {
    		Board board = boardService.getBoard(idx);
        	return ResponseEntity.ok(board);
    	} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 조회 실패");
		}
    }
    
    // 게시물 등록
    @PostMapping("/board/write")
    public ResponseEntity<?> writeBoard(@RequestBody Board board) {
    	try {
    		boardService.writeBoard(board);
    	} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("글쓰기 실패");
		}
    	return ResponseEntity.ok("글쓰기 성공");
    }
    
    // 게시물 수정
    @PostMapping("/board/edit")
    public ResponseEntity<?> editBoard(@RequestBody Board board, @RequestParam int idx)  {
    	try {
    		int boardStat = boardService.editBoard(board, idx);
    		return ResponseEntity.status(boardStat).body(""); 
    	} catch (Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 수정 실패");
    	}
    }
    
    // 게시물 삭제
    @PostMapping("/board/delete")
    public ResponseEntity<?> deleteBoard(@RequestParam int idx) {
    	return ResponseEntity.ok(boardService.deleteBoard(idx));
    }
    
    // 게시물 작성 시 나타나는 정보들
    @GetMapping("/getUserInfo")
    public ResponseEntity<?> getUserInfo() {
        WriteUserDTO writeUserDTO = boardService.getUserInfo();
        // WriteUserDTO를 ResponseEntity로 반환
        try {
        	return ResponseEntity.ok(writeUserDTO);
        } catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 유저 정보를 불러 올 수 없습니다.");
		}
        
        
    }
    
//    // 게시물에 저장된 유저 정보 검증 메서드
//    @PostMapping("/checkUser") // /checkUser?idx=5
//    public ResponseEntity<?> checkUser(@RequestParam int idx) {
//    	return ResponseEntity.status(boardService.checkUser(idx)).body(null);
//    }
//    
 
}
