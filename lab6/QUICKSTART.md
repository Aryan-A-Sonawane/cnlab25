# 🚀 Quick Start Guide - Online Bookstore

## Step-by-Step Instructions

### 1️⃣ Install Backend Dependencies
```powershell
cd backend
npm install
```

### 2️⃣ Install Frontend Dependencies
```powershell
cd ..\frontend
npm install
```

### 3️⃣ Start MongoDB
Make sure MongoDB is running on your system:
```powershell
# Check if MongoDB service is running
# If installed as service, it should auto-start
# Or manually start: mongod
```

### 4️⃣ Seed the Database (First Time Only)
```powershell
cd ..\backend
node seedDatabase.js
```

### 5️⃣ Start Backend Server
```powershell
# From backend directory
npm start
```
Backend runs on: http://localhost:5000

### 6️⃣ Start Frontend (New Terminal)
```powershell
# Open new terminal/PowerShell
cd frontend
npm start
```
Frontend runs on: http://localhost:3000

## 🎯 Test the Application

1. Open browser: http://localhost:3000
2. Click "Register" to create account
3. Fill in registration form
4. Browse books in catalogue
5. Use search and filter features

## 📊 Default Sample Data

The database will be populated with 12 sample books across different categories:
- Fiction (The Great Gatsby, To Kill a Mockingbird, 1984)
- Non-Fiction (Sapiens)
- Science (The Selfish Gene, A Brief History of Time)
- Technology (Clean Code)
- Biography (Steve Jobs)
- Fantasy (Harry Potter)
- Mystery (The Da Vinci Code)
- Self-Help (Atomic Habits)
- Romance (Pride and Prejudice)

## ⚡ Quick Commands Reference

### Backend
```powershell
cd backend
npm install          # Install dependencies
npm start           # Start server
npm run dev         # Start with nodemon (auto-reload)
node seedDatabase.js # Populate database
```

### Frontend
```powershell
cd frontend
npm install    # Install dependencies
npm start      # Start development server
npm run build  # Create production build
```

## 🔧 Configuration

Backend `.env` file (already created):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

## ✅ Verification Checklist

- [ ] Node.js installed (check: `node --version`)
- [ ] MongoDB installed and running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Database seeded with sample books
- [ ] Backend server running on port 5000
- [ ] Frontend app running on port 3000
- [ ] Can access http://localhost:3000

## 🆘 Common Issues

**Issue**: MongoDB connection error
**Solution**: Ensure MongoDB service is running

**Issue**: Port 5000 already in use
**Solution**: Change PORT in backend/.env file

**Issue**: Cannot connect to backend from frontend
**Solution**: Verify proxy in frontend/package.json points to http://localhost:5000

## 📞 API Testing

Test backend API directly:
```powershell
# Test server is running
curl http://localhost:5000

# Get all books
curl http://localhost:5000/api/books

# Register user (replace with your data)
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\",\"phone\":\"1234567890\"}"
```

## 🎓 Assignment Requirements Checklist

- [x] Home Page - Attractive landing with features
- [x] Login Page - User authentication with JWT
- [x] Registration Page - New user registration with database
- [x] Catalogue Page - Book listing with search/filter
- [x] Responsive Design - Works on mobile/tablet/desktop
- [x] React Frontend - Modern component-based architecture
- [x] Node.js Backend - RESTful API with Express
- [x] MongoDB Database - User and Book collections
- [x] Full CRUD operations - Create, Read, Update, Delete

---

**All set! Happy coding! 🎉**
