package com.btec.quanlykhohang_api;

import jakarta.persistence.PrePersist;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "game-history")
public class GameHistory {

    @Id
    private String id;

    private String email; // Lưu email thay vì username


    private List<String> moves; // Lưu danh sách nước đi dạng List<String>

    private String result; // WIN, LOSE, DRAW

    private LocalDateTime timestamp;

    // Tự động thiết lập timestamp khi tạo ván đấu mới
    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getMoves() {
        return moves;
    }

    public void setMoves(List<String> moves) {
        this.moves = moves;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
