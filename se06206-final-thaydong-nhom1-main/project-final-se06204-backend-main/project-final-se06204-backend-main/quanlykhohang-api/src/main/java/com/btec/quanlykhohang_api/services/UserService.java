package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.User;
import com.btec.quanlykhohang_api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Đăng ký tài khoản
    public User createUser(User user) throws Exception {
        // Kiểm tra nếu email đã tồn tại
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new Exception("Email đã tồn tại. Vui lòng chọn email khác.");
        }

        // Mã hóa mật khẩu trước khi lưu
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    // Lấy thông tin người dùng theo email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // Lấy danh sách tất cả người dùng
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Lấy người dùng theo ID
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    // Cập nhật thông tin người dùng
    public User updateUser(String id, User updatedUser) throws Exception {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setBirthDay(updatedUser.getBirthDay());
            user.setActive(updatedUser.isActive());
            user.setAddress(updatedUser.getAddress());

            // Kiểm tra nếu email cập nhật đã tồn tại trên hệ thống
            if (!user.getEmail().equals(updatedUser.getEmail()) &&
                    userRepository.findByEmail(updatedUser.getEmail()).isPresent()) {
                throw new Exception("Email đã được sử dụng bởi tài khoản khác.");
            }

            user.setEmail(updatedUser.getEmail());

            return userRepository.save(user);
        }
        return null;
    }

    // Xóa người dùng
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
