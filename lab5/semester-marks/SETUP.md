# Semester Marks Management System

A simple full-stack demonstration project for managing semester marks.

## Features
- Enter student details and subject marks
- Calculate total marks, percentage, and grade
- MSE (30 marks) + ESE (70 marks) weightage system
- Display pass/fail status
- Print result functionality
- Responsive design

## Project Structure
```
semester-marks/
├── index.html              # Frontend (HTML + CSS + JavaScript)
├── backend/
│   ├── Result.java         # Result entity model
│   ├── Subject.java        # Subject model
│   ├── ResultRepository.java
│   ├── ResultService.java  # Business logic
│   ├── ResultController.java # REST API endpoints
│   ├── application.properties
│   └── pom.xml
└── database/
    └── schema.sql          # Database setup
```

## Quick Start

### 1. Frontend Only (Demo)
Simply open `index.html` in a browser. Works without backend.

### 2. Full Stack Setup

#### Database (MySQL)
```sql
CREATE DATABASE semester_marks;
```

#### Backend
```bash
cd backend
mvn spring-boot:run
```
API runs on: http://localhost:8080

#### REST API Endpoints
- POST `/api/results` - Save result
- GET `/api/results` - Get all results
- GET `/api/results/{rollNo}` - Get result by roll number

## Grade Calculation
- A+: 90-100%
- A: 80-89%
- B+: 70-79%
- B: 60-69%
- C: 50-59%
- D: 40-49%
- F: <40%

Pass criteria: Each subject ≥40 marks and overall ≥40%

## Database Alternatives

### MongoDB
Update `application.properties`:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/semester_marks
```

### Oracle
Update `application.properties`:
```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:xe
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver
```
