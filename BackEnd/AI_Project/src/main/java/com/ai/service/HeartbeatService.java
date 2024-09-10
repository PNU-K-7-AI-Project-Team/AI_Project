package com.ai.service;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ai.persistence.UserRepository;
import com.ai.persistence.UserVitalSignRepository;
import com.ai.domain.Role;
import com.ai.domain.User;
import com.ai.domain.UserVitalSign;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HeartbeatService {
	private final UserRepository userRepo;
	private final UserVitalSignRepository uvRepo;
	
	private int lastNo = 0; // 마지막 출력된 No를 저장
	
	@Scheduled(fixedRate = 50000000)
	 public void printHeartbeatData() {
        User currentUser = getUserFromToken();

        if (currentUser != null) {
            String userCode = currentUser.getUserCode();
            Role role = currentUser.getRole(); // Assuming you have a getRole method in User

            List<UserVitalSign> userVitalSigns;
            if (Role.ROLE_ADMIN.equals(role)) {
                // 관리자일 경우, 모든 사용자의 심박수 데이터 조회
                userVitalSigns = uvRepo.findAll();
            } else {
                // 일반 사용자일 경우, 현재 사용자에 대한 심박수 데이터 조회
                userVitalSigns = uvRepo.findByUserCode(userCode);
            }

            // 심박수 데이터를 출력
            userVitalSigns.forEach(uvs -> {
                System.out.println("UserCode: " + uvs.getUserCode() + ", Heartbeat: " + uvs.getHeartbeat());
            });
        } else {
            System.out.println("No user found in the current session.");
        }
    }
	
	// 로그인 후 얻은 토큰으로 해당 아이디의 User 객체를 추출
	private User getUserFromToken() {
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
	
}
