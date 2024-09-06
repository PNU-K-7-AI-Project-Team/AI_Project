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
//		// 실행 시 계정 추가
//		userRepo.save(User.builder()
//						  .userCode(ls.generateUniqueUserCode(8))
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
//		
//		userRepo.save(User.builder()
//				  .userCode(ls.generateUniqueUserCode(8))
//				  .userId("aa")
//				  .password(passwordEnc.encode("11"))
//				  .userName("손흥민")
//				  .role(Role.ROLE_USER)
//				  .position(Position.JUNIOR)
//				  .dept(Dept.HR)
//				  .region(Region.BUSAN)
//				  .dateOfBirth(new Date())
//				  .gender(Gender.M)
//				  .build()  
//		);
//		
//		userRepo.save(User.builder()
//				  .userCode(ls.generateUniqueUserCode(8))
//				  .userId("bb")
//				  .password(passwordEnc.encode("11"))
//				  .userName("홍명보")
//				  .role(Role.ROLE_USER)
//				  .position(Position.SENIOR)
//				  .dept(Dept.QM)
//				  .region(Region.DAEGU)
//				  .dateOfBirth(new Date())
//				  .gender(Gender.F)
//				  .build()  
//		);
//		
//		userRepo.save(User.builder()
//				  .userCode(ls.generateUniqueUserCode(8))
//				  .userId("cc")
//				  .password(passwordEnc.encode("11"))
//				  .userName("차두리")
//				  .role(Role.ROLE_USER)
//				  .position(Position.SENIOR)
//				  .dept(Dept.IT)
//				  .region(Region.INCHEON)
//				  .dateOfBirth(new Date())
//				  .gender(Gender.M)
//				  .build()  
//		);
//		
//		userRepo.save(User.builder()
//				  .userCode(ls.generateUniqueUserCode(8))
//				  .userId("dd")
//				  .password(passwordEnc.encode("11"))
//				  .userName("이강인")
//				  .role(Role.ROLE_ADMIN)
//				  .position(Position.MANAGER)
//				  .dept(Dept.HR)
//				  .region(Region.GWANGJU)
//				  .dateOfBirth(new Date())
//				  .gender(Gender.M)
//				  .build()  
//		);
//	}
//}
