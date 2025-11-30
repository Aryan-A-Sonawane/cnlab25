# Quick Start Guide

## Step-by-Step Instructions

### Step 1: Setup MySQL Database
```sql
CREATE DATABASE semester_marks;
```

### Step 2: Configure Database Connection
Edit: `backend/src/main/resources/application.properties`
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### Step 3: Start Backend
```bash
cd backend
mvn spring-boot:run
```
Wait for: "Started SemesterMarksApplication in X seconds"

### Step 4: Start Frontend
Open new terminal:
```bash
cd frontend
npm install
npm start
```
Browser opens automatically at http://localhost:3000

### Step 5: Test the Application
1. Enter student details
2. Add subject marks (MSE out of 30, ESE out of 70)
3. Click "Calculate Result"
4. Backend calculates everything and returns result

## Important Notes

✓ **Frontend (React)**: Only UI and data entry  
✓ **Backend (Spring Boot)**: ALL calculations and business logic  
✓ **Database (MySQL)**: Stores all results

## Calculation Flow
```
React (User Input) 
    → POST to Spring Boot 
    → Service Layer (Calculations) 
    → MySQL (Save) 
    → Return Result 
    → React (Display)
```

## Troubleshooting

**Backend won't start?**
- Check MySQL is running
- Verify database credentials in application.properties

**Frontend can't connect?**
- Ensure backend is running on port 8080
- Check CORS settings in ResultController

**Port already in use?**
- Backend: Change server.port in application.properties
- Frontend: Set PORT=3001 in environment
