package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.GameHistory;
import com.btec.quanlykhohang_api.GameHistoryRequest;
import com.btec.quanlykhohang_api.GameHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/chess")
public class ChessController {
    private final GameHistoryService gameHistoryService;

    // Constructor Injection (tốt hơn @Autowired)

    @Autowired
    public ChessController(GameHistoryService gameHistoryService) {
        this.gameHistoryService = gameHistoryService;
    }

    // 🟢 Lưu ván cờ mới theo email
    @PostMapping("/save-game")
    public ResponseEntity<String> saveGame(@RequestBody GameHistoryRequest request) {
        if (request == null || request.getEmail() == null || request.getResult() == null) {
            return ResponseEntity.badRequest().body("Dữ liệu đầu vào không hợp lệ!");
        }

        gameHistoryService.saveGameHistory(request.getEmail(), request.getMoves(), request.getResult());
        return ResponseEntity.ok("Game history saved successfully!");
    }

    // 🟢 Lấy lịch sử ván đấu theo email
    @GetMapping("/history/{email}")
    public ResponseEntity<List<GameHistory>> getUserHistory(@PathVariable String email) {
        return ResponseEntity.ok(gameHistoryService.getUserGameHistory(email).getBody());
    }

    // 🟢 Thêm nước đi vào một ván đấu
    @PostMapping("/move")
    public ResponseEntity<GameHistory> addMove(@RequestParam Long gameId, @RequestParam String move) {
        return gameHistoryService.addMoveToGame(gameId, move);
    }

    // 🟢 Lấy danh sách nước đi của một ván đấu
    @GetMapping("/history/game/{gameId}")
    public ResponseEntity<ArrayList<String>> getGameMoves(@PathVariable Long gameId) {
        return gameHistoryService.getMovesByGameId(gameId);
    }

    // 🟢 Lấy danh sách ván đấu theo email
    @GetMapping("/user/{email}")
    public ResponseEntity<List<GameHistory>> getGamesByEmail(@PathVariable String email) {
        return gameHistoryService.getGamesByEmail(email);
    }
}
