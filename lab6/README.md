# Online Bookstore - Full Stack Web Application

A responsive online bookstore built with React, Node.js/Express, and MongoDB featuring user authentication, book catalog, and modern UI.

## 🚀 Features

### Frontend (React)
- **Home Page**: Attractive landing page with features and call-to-action
- **Login Page**: User authentication with JWT tokens
- **Registration Page**: New user registration with form validation
- **Catalogue Page**: Browse books with search and category filters
- Fully responsive design for mobile, tablet, and desktop
- Modern gradient UI with smooth animations

### Backend (Node.js/Express)
- RESTful API architecture
- User authentication with JWT tokens
- Password hashing with bcrypt
- MongoDB database integration
- CORS enabled for cross-origin requests

### Database (MongoDB)
- User collection with authentication
- Book collection with detailed information
- Mongoose ODM for schema validation

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone or Navigate to Project Directory
```bash
cd e:\Btech\TY\SEM5\CN\CN_LAB\cn_codes\lab7
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already created, but verify these settings)
# Update MONGODB_URI if using MongoDB Atlas or different connection
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install dependencies
npm install
```

### 4. Database Setup

```bash
# Make sure MongoDB is running
# From backend directory, seed the database with sample books
cd ../backend
node seedDatabase.js
```

## 🎯 Running the Application

### Start Backend Server
```bash
# From backend directory
cd backend
npm start
# Or for development with auto-reload:
npm run dev

# Server will run on http://localhost:5000
```

### Start Frontend Development Server
```bash
# Open a new terminal
# From frontend directory
cd frontend
npm start

# React app will run on http://localhost:3000
```

## 📱 Using the Application

1. **Home Page** (`/`)
   - View the landing page with features
   - Click "Browse Books" to see the catalogue
   - Click "Sign Up Now" to register

2. **Register** (`/register`)
   - Fill in your details (name, email, phone, address, password)
   - Submit to create an account
   - Automatically logged in and redirected to catalogue

3. **Login** (`/login`)
   - Enter your email and password
   - Click Login to access your account
   - Redirected to catalogue page

4. **Catalogue** (`/catalogue`)
   - Browse all available books
   - Search by title or author
   - Filter by category
   - View book details, ratings, and prices

## 🗂️ Project Structure

```
lab7/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema
│   │   └── Book.js          # Book schema
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── books.js         # Book routes
│   ├── server.js            # Express server setup
│   ├── seedDatabase.js      # Sample data seeder
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables
│
└── frontend/
    ├── public/
    │   └── index.html       # HTML template
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js    # Navigation component
    │   │   └── Footer.js    # Footer component
    │   ├── pages/
    │   │   ├── Home.js      # Home page
    │   │   ├── Login.js     # Login page
    │   │   ├── Register.js  # Registration page
    │   │   └── Catalogue.js # Book catalogue page
    │   ├── App.js           # Main app component
    │   ├── index.js         # React entry point
    │   └── index.css        # Global styles
    └── package.json         # Frontend dependencies
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)

### Book Routes (`/api/books`)
- `GET /api/books` - Get all books (with optional filters)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Add new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `GET /api/books/categories/list` - Get all categories

## 🎨 Tech Stack

**Frontend:**
- React 18
- React Router DOM v6
- Axios for API calls
- CSS3 with Flexbox and Grid

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- CORS middleware
- dotenv for environment variables

## 🔒 Security Features

- Passwords hashed using bcrypt
- JWT token-based authentication
- Protected routes
- Input validation
- CORS configuration

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Mobile devices (< 480px)
- Tablets (< 768px)
- Desktops (> 768px)

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod` or check MongoDB service
- Verify connection string in `.env` file

**Port Already in Use:**
- Change PORT in backend `.env` file
- Kill process using the port

**CORS Error:**
- Verify proxy in frontend `package.json` points to backend URL
- Check CORS middleware in backend `server.js`

## 📝 Sample Test Account

After seeding the database, you can register a new account or create one via the registration page.

## 🚀 Future Enhancements

- Shopping cart functionality
- Payment integration
- Order history
- Book reviews and ratings
- Admin panel for book management
- User profile management
- Wishlist feature
- Advanced search with filters

## 👨‍💻 Development

Created for Computer Networks Lab Assignment
- Frontend: React with modern hooks
- Backend: RESTful API with Node.js
- Database: MongoDB for data persistence

## 📄 License

This project is created for educational purposes.

---

**Happy Reading! 📚**
