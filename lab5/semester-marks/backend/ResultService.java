package com.marks.service;

import com.marks.model.Result;
import com.marks.model.Subject;
import com.marks.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {
    
    @Autowired
    private ResultRepository resultRepository;
    
    public Result calculateAndSaveResult(Result result) {
        double totalMarks = 0;
        double maxMarks = result.getSubjects().size() * 100;
        boolean allPass = true;
        
        for (Subject subject : result.getSubjects()) {
            double total = subject.getMse() + subject.getEse();
            totalMarks += total;
            if (total < 40) {
                allPass = false;
            }
        }
        
        double percentage = (totalMarks / maxMarks) * 100;
        result.setTotalMarks(totalMarks);
        result.setPercentage(percentage);
        result.setGrade(calculateGrade(percentage));
        result.setStatus(allPass && percentage >= 40 ? "PASS" : "FAIL");
        
        return resultRepository.save(result);
    }
    
    private String calculateGrade(double percentage) {
        if (percentage >= 90) return "A+";
        else if (percentage >= 80) return "A";
        else if (percentage >= 70) return "B+";
        else if (percentage >= 60) return "B";
        else if (percentage >= 50) return "C";
        else if (percentage >= 40) return "D";
        else return "F";
    }
    
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }
    
    public Result getResultByRollNo(String rollNo) {
        return resultRepository.findByRollNo(rollNo);
    }
}
