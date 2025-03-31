package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.User;
import com.btec.quanlykhohang_api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Đăng ký người dùng mới
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.getUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email đã tồn tại. Vui lòng sử dụng email khác!");
        }
        try {
            User newUser = userService.createUser(user);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi khi đăng ký tài khoản.");
        }
    }

    // Đăng nhập người dùng
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody User user) {
        Optional<User> authenticatedUser = userService.login(user.getEmail(), user.getPassword());
        return authenticatedUser
                .map(authUser -> ResponseEntity.ok().body((Object) authUser))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email hoặc mật khẩu không đúng!"));
    }

    // Đăng xuất người dùng
    @PostMapping("/logout/{email}")
    public ResponseEntity<String> logout(@PathVariable String email) {
        if (userService.getUserByEmail(email).isPresent()) {
            userService.logoutByEmail(email);
            return ResponseEntity.ok("Đăng xuất thành công.");
        } else {
            return ResponseEntity.badRequest().body("Người dùng không tồn tại.");
        }
    }

    // Lấy danh sách tất cả người dùng
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Lấy danh sách người dùng đang online
    @GetMapping("/online")
    public ResponseEntity<List<User>> getOnlineUsers() {
        return ResponseEntity.ok(userService.getOnlineUsers());
    }

    // Lấy số lượng tài khoản đăng ký trong ngày
    @GetMapping("/registrations/today")
    public ResponseEntity<Long> getUserRegistrationsToday() {
        return ResponseEntity.ok(userService.getUserRegistrationsToday());
    }

    // Lấy thông tin người dùng theo Email
    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.ok(new User("not_found@example.com", "", "Không", "Tồn tại", null, "", "USER")));
    }

    // Cập nhật thông tin người dùng bằng email
    @PutMapping("/{email}")
    public ResponseEntity<?> updateUser(@PathVariable String email, @RequestBody User updatedUser) {
        try {
            Optional<User> user = userService.getUserByEmail(email);
            if (user.isPresent()) {
                User updated = userService.updateUserByEmail(email, updatedUser);
                return ResponseEntity.ok(updated);
            } else {
                return ResponseEntity.badRequest().body("Người dùng không tồn tại.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi cập nhật: " + e.getMessage());
        }
    }

    // Xóa người dùng bằng email
    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteUser(@PathVariable String email) {
        if (userService.getUserByEmail(email).isPresent()) {
            userService.deleteUserByEmail(email);
            return ResponseEntity.ok("Xóa người dùng thành công.");
        }
        return ResponseEntity.badRequest().body("Người dùng không tồn tại.");
    }
}
