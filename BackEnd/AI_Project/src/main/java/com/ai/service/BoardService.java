package com.ai.service;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ai.domain.Board;
import com.ai.domain.User;
import com.ai.persistence.BoardRepository;
import com.ai.persistence.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // 다른 클래스에 있는 함수들을 쉽게 사용하려고 final 선언한 다른 클래스의 변수들은 손쉽게 의존성 주입이됨
public class BoardService {
	
	private final BoardRepository boardRepo;
	
	private final UserRepository userRepo;
	
	// 로그인 후 얻은 토큰으로 해당 아이디의 User 객체를 추출
	public User getUserFromToken() {
		// SecurityContextHolder: 로그인하면 토큰이 나오는데, 
		// 토큰에 들어있는 정보를 바탕으로 Spring Security가 인증 정보를 저장하는 객체
		// 인증정보(아이디,비밀번호 등)를 가져와서 authentication에 저장
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		// 인증정보가 있으면서 인증되었다면(아이디,비밀번호가 DB에 있다면)		
		if (authentication != null && authentication.isAuthenticated()) {
			String userId = authentication.getName(); // 인증 정보의 아이디를 추출해서 userId에 저장 
			if (userId != null) { // userId가 존재하면,
				return userRepo.findByUserId(userId).orElse(null); // 해당 userId의 user 객체를 반환
			}
		}
		return null;
	}

	
	// 게시판 출력
	// Pageable: 페이지네이션정보(페이지 번호, 페이지 크기, 정렬방식을 포함)
	public Page<Board> getBoards(Pageable pageable) {
		return boardRepo.findAll(pageable);
		// boardRepo.findAll에서 가져온 게시글 전체 데이터를 
		// Pageable을 통해 전체 데이터 개수를 계산한다
	}
	
	// 게시물 조회
	public Board getBoard(int idx) {
		return boardRepo.findById(idx) // DB에서 idx에 해당하는 게시물을 찾는다. 없으면 RuntimeException 발생 
				.orElseThrow(() -> new RuntimeException("해당 공지사항이 존재하지 않습니다."));
	}
	
	// 게시물 작성
	public Board boardWrite(Board board) {
		// 토큰에서 추출한 유저 객체
		User user = getUserFromToken();
		Date now = new Date();
		Board newBoard = Board.builder()
							   .userCode(user.getUserCode())
							   .userId(user.getUserId())
							   .userName(user.getUserName())
							   .title(board.getTitle())
							   .content(board.getContent())
							   .createDate(now)
							   .updateDate(now)
							   .build(); // DB에 작성한 새 게시물을 저장
		return boardRepo.save(newBoard);
	}

}
