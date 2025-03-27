package com.btec.quanlykhohang_api;


import java.util.List;


public class GameHistoryRequest {
    private String email; // Sử dụng email thay vì username

    private List<String> moves; // Danh sách nước đi

    private String result; // Kết quả ván đấu (WIN, LOSE, DRAW)

    public GameHistoryRequest(String email, List<String> moves, String result) {
        this.email = email;
        this.moves = moves;
        this.result = result;
    }

    public GameHistoryRequest() {
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
}
