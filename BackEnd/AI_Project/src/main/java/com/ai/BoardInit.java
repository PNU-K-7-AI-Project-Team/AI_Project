//package com.ai;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
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
//@Component
//@RequiredArgsConstructor
//public class BoardInit implements ApplicationRunner {
//
//    private final UserRepository userRepo;
//    private final BoardRepository boardRepo;
//
//    @Override
//    public void run(ApplicationArguments args) throws Exception {
//
//        // 관리자 사용자 검색
//        User admin = userRepo.findByUserId("admin")
//                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
//        
//        User manager = userRepo.findByUserId("manager")
//                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
//
//        // u1, u3, u12 ~ u51 사용자 검색
//        List<User> users = getUsersByIds();
//        
//        for (int i = 1; i <= 3; i++) {
//            boardRepo.save(Board.builder()
//                    .userCode(admin.getUserCode())
//                    .title("제목" + i)
//                    .content("내용" + i)
//                    .userId(admin.getUserId())
//                    .userName(admin.getUserName())
//                    .dept(admin.getDept())
//                    .build());
//        }
//        
//        for (int i = 1; i <= 3; i++) {
//            boardRepo.save(Board.builder()
//                    .userCode(manager.getUserCode())
//                    .title("제목" + i)
//                    .content("내용" + i)
//                    .userId(manager.getUserId())
//                    .userName(manager.getUserName())
//                    .dept(manager.getDept())
//                    .build());
//        }
//
//        // 작업자들 게시물 (나중엔 지울거임 구분용)
//        for (User user : users) {
//            for (int i = 1; i <= 3; i++) {
//                boardRepo.save(Board.builder()
//                        .userCode(user.getUserCode())  
//                        .title("제목" + i)
//                        .content("내용" + i)
//                        .userId(user.getUserId())      
//                        .userName(user.getUserName()) 
//                        .dept(user.getDept())         
//                        .build());
//            }
//        }
//    }
//
//    // u1, u3, u12 ~ u51 까지의 아이디로 사용자 검색 메서드
//    public List<User> getUsersByIds() {
//        List<User> users = new ArrayList<>();
//
//        // u1, u3을 먼저 추가하고, u12 ~ u51 까지의 아이디를 추가
//        String[] userIds = {"u1", "u3"};
//        for (int i = 12; i <= 51; i++) {
//            userIds = addToArray(userIds, "u" + i);
//        }
//
//        // 각 아이디로 사용자 찾기
//        for (String userId : userIds) {
//            Optional<User> userOptional = userRepo.findByUserId(userId);
//            if (userOptional.isPresent()) {
//                users.add(userOptional.get());
//            } else {
//                System.out.println("User with ID " + userId + " not found");
//            }
//        }
//
//        return users;
//    }
//
//    // 배열에 새로운 값을 추가하는 헬퍼 메서드
//    private String[] addToArray(String[] array, String newValue) {
//        String[] newArray = new String[array.length + 1];
//        System.arraycopy(array, 0, newArray, 0, array.length);
//        newArray[array.length] = newValue;
//        return newArray;
//    }
//}
