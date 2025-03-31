package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional<Admin> findByEmail(String email);
}
