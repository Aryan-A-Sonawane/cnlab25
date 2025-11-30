package com.marks.controller;

import com.marks.model.Result;
import com.marks.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class ResultController {
    
    @Autowired
    private ResultService resultService;
    
    /**
     * POST /api/results
     * Create and calculate result
     * Frontend sends only raw data, backend calculates everything
     */
    @PostMapping
    public ResponseEntity<Result> createResult(@RequestBody Result result) {
        try {
            Result savedResult = resultService.calculateAndSaveResult(result);
            return ResponseEntity.ok(savedResult);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * GET /api/results
     * Get all results
     */
    @GetMapping
    public ResponseEntity<List<Result>> getAllResults() {
        List<Result> results = resultService.getAllResults();
        return ResponseEntity.ok(results);
    }
    
    /**
     * GET /api/results/{rollNo}
     * Get result by roll number
     */
    @GetMapping("/{rollNo}")
    public ResponseEntity<Result> getResultByRollNo(@PathVariable String rollNo) {
        return resultService.getResultByRollNo(rollNo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
