package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    // Tìm user theo email
    Optional<User> findByEmail(String email);

    // Tìm danh sách user theo trạng thái online
    List<User> findByOnline(boolean online);

    // Đếm số user đăng ký trong khoảng thời gian
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    // Tìm danh sách user theo vai trò (Admin, User)
    List<User> findByRole(String role);
}
