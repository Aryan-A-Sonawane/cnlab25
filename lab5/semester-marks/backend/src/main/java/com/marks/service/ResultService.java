package com.marks.service;

import com.marks.model.Result;
import com.marks.model.Subject;
import com.marks.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResultService {
    
    @Autowired
    private ResultRepository resultRepository;
    
    /**
     * Calculate and save result - ALL business logic here
     * Frontend only sends raw marks, backend does all calculations
     */
    public Result calculateAndSaveResult(Result result) {
        // Calculate total for each subject
        double totalMarks = 0;
        double maxMarks = result.getSubjects().size() * 100;
        boolean allPass = true;
        
        for (Subject subject : result.getSubjects()) {
            // Ensure totals are calculated
            double subjectTotal = subject.getMse() + subject.getEse();
            subject.setTotal(subjectTotal);
            totalMarks += subjectTotal;
            
            // Check if subject is passed (minimum 40 marks)
            if (subjectTotal < 40) {
                allPass = false;
            }
        }
        
        // Calculate percentage
        double percentage = (totalMarks / maxMarks) * 100;
        
        // Set calculated values
        result.setTotalMarks(totalMarks);
        result.setPercentage(percentage);
        result.setGrade(calculateGrade(percentage));
        result.setStatus(determineStatus(allPass, percentage));
        
        // Save to database
        return resultRepository.save(result);
    }
    
    /**
     * Calculate grade based on percentage
     */
    private String calculateGrade(double percentage) {
        if (percentage >= 90) return "A+";
        else if (percentage >= 80) return "A";
        else if (percentage >= 70) return "B+";
        else if (percentage >= 60) return "B";
        else if (percentage >= 50) return "C";
        else if (percentage >= 40) return "D";
        else return "F";
    }
    
    /**
     * Determine pass/fail status
     * Pass criteria: All subjects >= 40 AND overall percentage >= 40
     */
    private String determineStatus(boolean allPass, double percentage) {
        return (allPass && percentage >= 40) ? "PASS" : "FAIL";
    }
    
    /**
     * Get all results from database
     */
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }
    
    /**
     * Get result by roll number
     */
    public Optional<Result> getResultByRollNo(String rollNo) {
        return resultRepository.findByRollNo(rollNo);
    }
}
