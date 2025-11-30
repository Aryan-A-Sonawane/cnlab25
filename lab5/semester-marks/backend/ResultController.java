package com.marks.controller;

import com.marks.model.Result;
import com.marks.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*")
public class ResultController {
    
    @Autowired
    private ResultService resultService;
    
    @PostMapping
    public Result createResult(@RequestBody Result result) {
        return resultService.calculateAndSaveResult(result);
    }
    
    @GetMapping
    public List<Result> getAllResults() {
        return resultService.getAllResults();
    }
    
    @GetMapping("/{rollNo}")
    public Result getResultByRollNo(@PathVariable String rollNo) {
        return resultService.getResultByRollNo(rollNo);
    }
}
