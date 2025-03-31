package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.User;
import com.btec.quanlykhohang_api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Đăng ký tài khoản
    public User createUser(User user) throws Exception {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new Exception("Email đã tồn tại. Vui lòng chọn email khác.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword())); // Mã hóa mật khẩu
        user.setActive(false); // Mặc định offline khi đăng ký
        user.setCreatedAt(LocalDateTime.now()); // Lưu thời gian đăng ký

        return userRepository.save(user);
    }

    // Đăng nhập người dùng
    public Optional<User> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> {
                    user.setActive(true); // Đánh dấu user online
                    return userRepository.save(user);
                });
    }

    // Đăng xuất người dùng bằng email
    public void logoutByEmail(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            user.setActive(false);
            userRepository.save(user);
        });
    }

    // Lấy danh sách tất cả người dùng
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Lấy danh sách người dùng online
    public List<User> getOnlineUsers() {
        return userRepository.findByOnline(true);
    }

    // Lấy số lượng user đăng ký hôm nay
    public long getUserRegistrationsToday() {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        return userRepository.countByCreatedAtBetween(startOfDay, endOfDay);
    }

    // Cập nhật thông tin người dùng bằng email
    public User updateUserByEmail(String email, User updatedUser) throws Exception {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setBirthDay(updatedUser.getBirthDay());
            user.setActive(updatedUser.isActive());
            user.setAddress(updatedUser.getAddress());

            // Kiểm tra nếu muốn đổi email
            if (!user.getEmail().equals(updatedUser.getEmail()) &&
                    userRepository.findByEmail(updatedUser.getEmail()).isPresent()) {
                throw new Exception("Email đã được sử dụng bởi tài khoản khác.");
            }

            user.setEmail(updatedUser.getEmail());

            return userRepository.save(user);
        }
        return null;
    }

    // Xóa người dùng bằng email
    public void deleteUserByEmail(String email) {
        userRepository.findByEmail(email).ifPresent(userRepository::delete);
    }

    // Lấy người dùng theo email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
