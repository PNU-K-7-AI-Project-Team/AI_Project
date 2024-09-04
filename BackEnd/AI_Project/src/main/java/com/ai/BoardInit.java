package com.ai;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.ai.domain.Board;
import com.ai.domain.User;
import com.ai.persistence.BoardRepository;
import com.ai.persistence.UserRepository;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class BoardInit implements ApplicationRunner{
	private final UserRepository userRepo;
	private final BoardRepository boardRepo;
	

	@Override
	public void run(ApplicationArguments args) throws Exception {

		User admin = userRepo.findByUserId("admin")
				.orElseThrow(()->new UsernameNotFoundException("User Not Found"));
		
		for (int i=1; i<=10; i++) {
			boardRepo.save(Board.builder()
							.userCode(admin.getUserCode())
							.title("제목" + i)
							.content("내용" + i)
							.userId(admin.getUserId())
							.userName(admin.getUserName())
							.dept(admin.getDept())
							.build());
		}
	}
	
	
}
