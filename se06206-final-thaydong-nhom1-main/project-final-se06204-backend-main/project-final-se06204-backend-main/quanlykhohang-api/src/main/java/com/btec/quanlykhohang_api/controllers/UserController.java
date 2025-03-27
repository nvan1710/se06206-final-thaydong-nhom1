package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.User;
import com.btec.quanlykhohang_api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // API đăng ký người dùng mới
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Kiểm tra email đã tồn tại chưa
        if (userService.getUserByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email đã tồn tại. Vui lòng sử dụng email khác!");
        }

        try {
            User newUser = userService.createUser(user);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi khi đăng ký tài khoản.");
        }
    }

    // Lấy danh sách tất cả người dùng
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Lấy thông tin người dùng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Cập nhật thông tin người dùng
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User updatedUser) throws Exception {
        User user = userService.updateUser(id, updatedUser);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    // Xóa người dùng
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
