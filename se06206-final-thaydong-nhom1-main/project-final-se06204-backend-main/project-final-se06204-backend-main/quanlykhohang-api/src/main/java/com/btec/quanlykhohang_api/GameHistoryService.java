package com.btec.quanlykhohang_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameHistoryService {

    private final GameHistoryRepository gameHistoryRepository;

    // Constructor Injection (tốt hơn @Autowired)
    @Autowired
    public GameHistoryService(GameHistoryRepository gameHistoryRepository) {
        this.gameHistoryRepository = gameHistoryRepository;
    }

    // 📝 Lưu lịch sử ván cờ theo email
    public ResponseEntity<String> saveGameHistory(String email, List<String> moves, String result) {
        if (email == null || email.isBlank() || result == null || result.isBlank()) {
            return ResponseEntity.badRequest().body("Email và kết quả không được để trống!");
        }

        GameHistory gameHistory = new GameHistory();
        gameHistory.setEmail(email);
        gameHistory.setMoves(moves == null ? new ArrayList<>() : moves);
        gameHistory.setResult(result);
        gameHistoryRepository.save(gameHistory);

        return ResponseEntity.ok("Lịch sử ván đấu đã được lưu!");
    }

    // 🏆 Lấy lịch sử các ván cờ của người dùng theo email
    public ResponseEntity<List<GameHistory>> getUserGameHistory(String email) {
        List<GameHistory> history = gameHistoryRepository.findByEmail(email);
        return history.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(history);
    }

    // 🔍 Lấy danh sách ván đấu theo email
    public ResponseEntity<List<GameHistory>> getGamesByEmail(String email) {
        return getUserGameHistory(email);
    }

    // ➕ Thêm nước đi vào ván đấu
    @Transactional
    public ResponseEntity<GameHistory> addMoveToGame(Long gameId, String move) {
        if (gameId == null || move == null || move.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        return gameHistoryRepository.findById(String.valueOf(gameId))
                .map(gameHistory -> {
                    gameHistory.getMoves().add(move);
                    gameHistoryRepository.save(gameHistory);
                    return ResponseEntity.ok(gameHistory);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 📜 Lấy danh sách nước đi của ván đấu theo ID
    @Transactional(readOnly = true)
    public ResponseEntity<ArrayList<String>> getMovesByGameId(Long gameId) {
        if (gameId == null) {
            return ResponseEntity.badRequest().build();
        }

        return gameHistoryRepository.findById(String.valueOf(gameId))
                .map(game -> ResponseEntity.ok(new ArrayList<>(game.getMoves())))
                .orElse(ResponseEntity.notFound().build());
    }
}
