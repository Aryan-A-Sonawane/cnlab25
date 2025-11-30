# Semester Marks Management System

Full-stack application: **React Frontend + Spring Boot Backend + MySQL Database**

## Architecture
- **Frontend**: React (sends only raw data)
- **Backend**: Spring Boot (handles ALL calculations and business logic)
- **Database**: MySQL (stores results)

## Project Structure
```
semester-marks/
├── frontend/               # React Application
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   └── index.js       # Entry point
│   ├── public/
│   └── package.json
│
├── backend/               # Spring Boot Application
│   ├── src/main/java/com/marks/
│   │   ├── SemesterMarksApplication.java  # Main class
│   │   ├── controller/
│   │   │   └── ResultController.java      # REST endpoints
│   │   ├── service/
│   │   │   └── ResultService.java         # Business logic
│   │   ├── model/
│   │   │   ├── Result.java
│   │   │   └── Subject.java
│   │   └── repository/
│   │       └── ResultRepository.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── database/
    └── schema.sql
```

## Setup Instructions

### 1. Database Setup (MySQL)
```sql
CREATE DATABASE semester_marks;
```
Update credentials in `backend/src/main/resources/application.properties`

### 2. Backend Setup (Spring Boot)
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend runs on: **http://localhost:8080**

### 3. Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```
Frontend runs on: **http://localhost:3000**

## How It Works

### Frontend (React)
- Provides UI for data entry
- Sends raw marks to backend
- Receives calculated results
- Displays results

### Backend (Spring Boot)
**ALL business logic is here:**
- Calculates subject totals (MSE + ESE)
- Computes semester percentage
- Assigns grade (A+, A, B+, B, C, D, F)
- Determines PASS/FAIL status
- Stores in MySQL database

### REST API Endpoints
- `POST /api/results` - Calculate and save result
- `GET /api/results` - Get all results
- `GET /api/results/{rollNo}` - Get specific result

## Grading System (Backend Logic)
- **A+**: 90-100%
- **A**: 80-89%
- **B+**: 70-79%
- **B**: 60-69%
- **C**: 50-59%
- **D**: 40-49%
- **F**: <40%

**Pass Criteria**: All subjects ≥40 marks AND overall ≥40%

## Technologies Used
- **Frontend**: React, Axios, CSS
- **Backend**: Spring Boot, JPA/Hibernate
- **Database**: MySQL
- **Build Tools**: Maven, npm

## Alternative Databases
See `application.properties` for MongoDB/Oracle configuration examples.
