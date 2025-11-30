# Architecture Overview

## Clear Separation of Concerns

### Frontend (React) - ONLY UI
**Location**: `frontend/src/App.js`

**Responsibilities**:
- Form for data entry
- Send data to backend via Axios
- Display results received from backend
- NO calculations
- NO business logic

**Code Flow**:
```javascript
// Frontend ONLY collects and sends data
const formData = {
  studentName: "John",
  rollNo: "21BCE001",
  semester: 5,
  subjects: [
    { name: "CN", mse: 25, ese: 60 }
  ]
};

// Send to backend
axios.post('http://localhost:8080/api/results', formData)
  .then(response => {
    // Backend returns CALCULATED result
    setResult(response.data);
  });
```

---

### Backend (Spring Boot) - ALL LOGIC
**Location**: `backend/src/main/java/com/marks/`

**Responsibilities**:
- Receive raw data from frontend
- Calculate subject totals (MSE + ESE)
- Calculate overall percentage
- Determine grade (A+, A, B+, B, C, D, F)
- Determine PASS/FAIL status
- Save to database
- Return calculated result

**Code Flow**:
```java
// ResultService.java - ALL calculations happen here

public Result calculateAndSaveResult(Result result) {
    // 1. Calculate each subject total
    for (Subject subject : result.getSubjects()) {
        double total = subject.getMse() + subject.getEse();
        subject.setTotal(total);
    }
    
    // 2. Calculate percentage
    double percentage = (totalMarks / maxMarks) * 100;
    
    // 3. Assign grade
    String grade = calculateGrade(percentage);
    
    // 4. Determine PASS/FAIL
    String status = determineStatus(allPass, percentage);
    
    // 5. Save to database
    return resultRepository.save(result);
}
```

---

### Database (MySQL) - DATA STORAGE
**Location**: MySQL Server

**Responsibilities**:
- Store calculated results
- Provide data persistence
- Enable data retrieval

**Tables**:
- `results` - Main result information
- `result_subjects` - Subject-wise marks

---

## Request-Response Flow

```
┌─────────────┐         ┌──────────────────┐         ┌──────────┐
│   React     │         │   Spring Boot    │         │  MySQL   │
│  Frontend   │         │     Backend      │         │ Database │
└─────────────┘         └──────────────────┘         └──────────┘
      │                          │                          │
      │  POST /api/results       │                          │
      │  (Raw marks only)        │                          │
      ├─────────────────────────>│                          │
      │                          │                          │
      │                          │ Calculate Totals         │
      │                          │ Calculate Percentage     │
      │                          │ Assign Grade             │
      │                          │ Determine Status         │
      │                          │                          │
      │                          │  Save Result             │
      │                          ├─────────────────────────>│
      │                          │                          │
      │                          │  Return Saved Result     │
      │                          │<─────────────────────────┤
      │                          │                          │
      │  Calculated Result       │                          │
      │<─────────────────────────┤                          │
      │                          │                          │
      │  Display to User         │                          │
      │                          │                          │
```

---

## Key Points

1. **React**: Pure UI layer, no calculations
2. **Spring Boot**: Complete business logic layer
3. **MySQL**: Data persistence layer
4. **MSE Weight**: 30 marks
5. **ESE Weight**: 70 marks
6. **Pass Criteria**: Each subject ≥40 AND overall ≥40%

This is TRUE full-stack architecture with proper separation of concerns!
