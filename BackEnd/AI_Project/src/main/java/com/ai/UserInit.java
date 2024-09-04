//package com.ai;
//
//import java.util.Date;
//
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import com.ai.domain.Dept;
//import com.ai.domain.Gender;
//import com.ai.domain.Position;
//import com.ai.domain.Region;
//import com.ai.domain.Role;
//import com.ai.domain.User;
//import com.ai.persistence.UserRepository;
//import com.ai.service.LoginService;
//
//import lombok.RequiredArgsConstructor;
//
//@Component
//@RequiredArgsConstructor
//public class UserInit implements ApplicationRunner{
//	private final UserRepository userRepo;
//	private final PasswordEncoder passwordEnc;
//	private final LoginService ls;
//	
//	
//	@Override
//	public void run(ApplicationArguments args) throws Exception {
//		// 현재 날짜를 생년월일로 지정
//		String userCode = ls.generateUniqueUserCode(8);
//		// 실행 시 계정 추가
//		userRepo.save(User.builder()
//						  .userCode(userCode)
//						  .userId("admin")
//						  .password(passwordEnc.encode("11"))
//						  .userName("관리자")
//						  .role(Role.ROLE_ADMIN)
//						  .position(Position.MANAGER)
//						  .dept(Dept.IT)
//						  .region(Region.SEOUL)
//						  .dateOfBirth(new Date())
//						  .gender(Gender.M)
//						  .build()  
//				);
//	}
//}
