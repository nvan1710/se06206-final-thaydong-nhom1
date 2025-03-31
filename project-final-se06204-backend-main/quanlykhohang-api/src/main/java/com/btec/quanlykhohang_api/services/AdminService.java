package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Admin;
import com.btec.quanlykhohang_api.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Xác thực admin
    public Optional<Admin> login(String email, String password) {
        return adminRepository.findByEmail(email)
                .filter(admin -> admin.getPassword().equals(password));
    }

    // Đăng ký admin mới
    public Admin registerAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
}
