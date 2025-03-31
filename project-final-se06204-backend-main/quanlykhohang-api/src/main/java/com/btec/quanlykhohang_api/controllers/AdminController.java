package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.Admin;
import com.btec.quanlykhohang_api.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Đăng nhập admin
    @PostMapping("/login")
    public String login(@RequestBody Admin admin) {
        Optional<Admin> authenticatedAdmin = adminService.login(admin.getEmail(), admin.getPassword());
        return authenticatedAdmin.isPresent() ? "Login successful" : "Invalid email or password";
    }

    // Đăng ký admin mới
    @PostMapping("/register")
    public Admin register(@RequestBody Admin admin) {
        return adminService.registerAdmin(admin);
    }
}
