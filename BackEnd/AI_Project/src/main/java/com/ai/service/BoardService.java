package com.ai.service;

import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ai.domain.Board;
import com.ai.domain.Role;
import com.ai.domain.User;
import com.ai.dto.GetBoardsDTO;
import com.ai.persistence.BoardRepository;
import com.ai.persistence.UserRepository;

import jakarta.transaction.Transactional;
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
	public Page<GetBoardsDTO> getBoards(Pageable pageable) {
		return boardRepo.findBoardsDTO(pageable);
		// boardRepo.findAll을 사용시, Page 내장 객체의 totalElements, totalPage, number 등,
		// 불필요한 데이터를 포함해서 구조가 맞지않을수 있다.
		// 이럴때 GetBoardsDTO(테이블 컬럼에 필요한 필드만 담아서)를 이용한 사용자 정의 데이터만 사용해서 
		// Pageable을 통해 전체 데이터 개수를 계산한다
	}
	
	// 게시물 조회
	public Board getBoard(int idx) {
		return boardRepo.findById(idx) // DB에서 idx에 해당하는 게시물을 찾는다. 없으면 RuntimeException 발생 
				.orElseThrow(() -> new RuntimeException("해당 공지사항이 존재하지 않습니다."));
	}
	
	// 게시물 작성
	@Transactional
	public Board writeBoard(Board board) {
		// 토큰에서 추출한 유저 객체
		User user = getUserFromToken();
		Date now = new Date();
		Board newBoard = Board.builder()
							   .userCode(user.getUserCode())
							   .title(board.getTitle())
							   .content(board.getContent())
							   .userId(user.getUserId())
							   .userName(user.getUserName())
							   .dept(user.getDept())
							   .createDate(now)
							   .updateDate(now)
							   .build(); // DB에 작성한 새 게시물을 저장
		return boardRepo.save(newBoard);
	}
	
	
	// 게시물 수정
	@Transactional
	public int editBoard(Board inputBoard, int idx) { // inputBoard: 수정하려는 Board 객체의 입력값(title, content)
		Optional<Board> board = boardRepo.findById(idx); // 해당 번호로 존재하는 게시물 DB에서 찾기
		String userCode = board.get().getUserCode(); // 찾은 게시물의 userCode 추출
		if (userCode != getUserFromToken().getUserCode()) // 게시물에 저장된 userCode와 토큰의 userCode가 다르면,
			return HttpStatus.UNAUTHORIZED.value(); // 401 반환 (인증 처리 실패)
		if (board.isPresent()) {
			Board updateBoard = board.get(); 
			// 게시물 저장된 userCode와 토큰 userCode가 같으면, 해당 board의 객체 참조값을 updateBoard에 저장
			updateBoard.setTitle(inputBoard.getTitle()); // 해당 Board 객체의 제목 수정
			updateBoard.setContent(inputBoard.getTitle());// 해당 Board 객체의 내용 수정
			boardRepo.save(updateBoard); // DB에 해당 Board 객체 저장
			return HttpStatus.OK.value(); // 200 반환 (요청 성공) 
		} else {
			return HttpStatus.INTERNAL_SERVER_ERROR.value(); // 500 반환 (예상치 못한 에러 발생)
		}
	}
	
	// 해당 게시물에 저장된 유저의 정보와 일치하는지, 모두 접근 가능한 권한인지 확인(해당 url 접근 여부 결정)
	public int checkUser (int idx) {
		try {
			// 해당 번호의 게시물이 DB에 존재하는지 확인
			// 존재하면, 해당 Board 객체를 board에 집어넣음
			// 존재하지않으면, Optional.empty()를 집어넣음 
			Optional<Board> board = boardRepo.findById(idx);
			// 존재하지 않으면, 예외 처리
			if (board.isEmpty()) throw new NoSuchElementException("해당 번호의 게시물을 찾을 수 없습니다.");
			// 해당 게시물에 저장된 userCode를 추출 
			String userCode = board.get().getUserCode();
			
			// 해당 userCode가 DB에 존재하는지 확인 후 일치하는 user 객체 추출
			Optional<User> user = userRepo.findByUserCode(getUserFromToken().getUserCode());
			// 존재하지 않으면, 예외 처리
			if (user.isEmpty()) throw new NoSuchElementException("해당 유저 코드를 찾을 수 없습니다.");
			// 해당 user 객체의 역할 추출
			Role role = user.get().getRole();
			
			if ((board.isPresent() && userCode == getUserFromToken().getUserCode())
					|| role == Role.ROLE_ADMIN) { // 게시물이 존재하면서 토큰에 저장된 userCode와 일치하거나, 권한이 관리자이면 이용 가능
				return HttpStatus.OK.value(); // 200 값 반환(요청 성공)
			} else {
				return HttpStatus.UNAUTHORIZED.value(); // 401값 반환(인증 처리 실패)
			}	
			} catch (Exception e) {
				return HttpStatus.UNAUTHORIZED.value();
			} 
	}

	// userCode와 idx로 해당 게시물 삭제
	@Transactional // 원자성: 모든 작업이 성공하거나, 오류가 발생하면 모든 작업을 취소시킴
	public int deleteBoard(int idx) {
		Optional<Board> board = boardRepo.findById(idx); // 해당 번호와 일치하는 게시물 객체를 찾아서 board에 저장
		String userCode = board.get().getUserCode(); // 해당 Board 객체의 userCode를 추출
		Optional<User> user = userRepo.findByUserCode(getUserFromToken().getUserCode());
		// 토큰에 저장된 userCode와 일치하는 DB의 User 객체를 user에 저장
		Role role = user.get().getRole(); // 해당 user의 권한을 추출
		if ((board.isPresent() && userCode == getUserFromToken().getUserCode())
				|| role == Role.ROLE_ADMIN) {
			boardRepo.deleteById(idx); // 
			return HttpStatus.OK.value(); // 200 값 반환 (성공)
		} else {
			return HttpStatus.UNAUTHORIZED.value(); // 401 값 반환 (인증 처리 실패)
		}
	}
}
