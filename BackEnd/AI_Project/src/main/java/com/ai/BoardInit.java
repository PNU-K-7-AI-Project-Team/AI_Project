//package com.ai;
//
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Component;
//
//import com.ai.domain.Board;
//import com.ai.domain.User;
//import com.ai.persistence.BoardRepository;
//import com.ai.persistence.UserRepository;
//
//import lombok.RequiredArgsConstructor;
//
//
//@Component
//@RequiredArgsConstructor
//public class BoardInit implements ApplicationRunner{
//	private final UserRepository userRepo;
//	private final BoardRepository boardRepo;
//	
//
//	@Override
//	public void run(ApplicationArguments args) throws Exception {
//
//		User admin = userRepo.findByUserId("admin")
//				.orElseThrow(()->new UsernameNotFoundException("User Not Found"));
//		
//		User aa = userRepo.findByUserId("aa")
//				.orElseThrow(()->new UsernameNotFoundException("User Not Found"));
//		
//		User bb = userRepo.findByUserId("bb")
//				.orElseThrow(()->new UsernameNotFoundException("User Not Found"));
//		
//		User cc = userRepo.findByUserId("cc")
//				.orElseThrow(()->new UsernameNotFoundException("User Not Found"));
//		
//		User dd = userRepo.findByUserId("dd")
//				.orElseThrow(()->new UsernameNotFoundException("User Not Found"));
//		
//		for (int i=1; i<=2; i++) {
//			boardRepo.save(Board.builder()
//							.userCode(admin.getUserCode())
//							.title("제목" + i)
//							.content("내용" + i)
//							.userId(admin.getUserId())
//							.userName(admin.getUserName())
//							.dept(admin.getDept())
//							.build());
//		}
//		
//		for (int i=1; i<=2; i++) {
//			boardRepo.save(Board.builder()
//							.userCode(aa.getUserCode())
//							.title("제목" + i)
//							.content("내용" + i)
//							.userId(aa.getUserId())
//							.userName(aa.getUserName())
//							.dept(aa.getDept())
//							.build());
//		}
//		
//		for (int i=1; i<=2; i++) {
//			boardRepo.save(Board.builder()
//							.userCode(bb.getUserCode())
//							.title("제목" + i)
//							.content("내용" + i)
//							.userId(bb.getUserId())
//							.userName(bb.getUserName())
//							.dept(bb.getDept())
//							.build());
//		}
//		
//		for (int i=1; i<=2; i++) {
//			boardRepo.save(Board.builder()
//							.userCode(cc.getUserCode())
//							.title("제목" + i)
//							.content("내용" + i)
//							.userId(cc.getUserId())
//							.userName(cc.getUserName())
//							.dept(cc.getDept())
//							.build());
//		}
//		
//		for (int i=1; i<=2; i++) {
//			boardRepo.save(Board.builder()
//							.userCode(dd.getUserCode())
//							.title("제목" + i)
//							.content("내용" + i)
//							.userId(dd.getUserId())
//							.userName(dd.getUserName())
//							.dept(dd.getDept())
//							.build());
//		}
//	}
//	
//	
//}
