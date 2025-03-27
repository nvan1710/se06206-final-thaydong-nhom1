package com.btec.quanlykhohang_api;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameHistoryRepository extends MongoRepository<GameHistory, String> {

    // Tìm lịch sử ván đấu theo email (thay vì username)
    List<GameHistory> findByEmail(String email);
}
