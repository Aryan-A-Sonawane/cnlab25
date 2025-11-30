const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data storage (temporary solution without MongoDB)
let users = [];
let books = [
  {
    _id: '1',
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    price: 299,
    category: "Fiction",
    isbn: "978-0-7432-7356-5",
    publisher: "Scribner",
    publishedYear: 1925,
    pages: 180,
    language: "English",
    stock: 50,
    imageUrl: "https://via.placeholder.com/200x300/667eea/ffffff?text=The+Great+Gatsby",
    rating: 4.5
  },
  {
    _id: '2',
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    price: 349,
    category: "Fiction",
    isbn: "978-0-06-112008-4",
    publisher: "J.B. Lippincott & Co.",
    publishedYear: 1960,
    pages: 324,
    language: "English",
    stock: 40,
    imageUrl: "https://via.placeholder.com/200x300/764ba2/ffffff?text=To+Kill+a+Mockingbird",
    rating: 4.8
  },
  {
    _id: '3',
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel depicting a totalitarian society under constant surveillance.",
    price: 279,
    category: "Fiction",
    isbn: "978-0-452-28423-4",
    publisher: "Secker & Warburg",
    publishedYear: 1949,
    pages: 328,
    language: "English",
    stock: 60,
    imageUrl: "https://via.placeholder.com/200x300/f093fb/ffffff?text=1984",
    rating: 4.7
  },
  {
    _id: '4',
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description: "A brief history of humankind exploring how Homo sapiens came to dominate the world.",
    price: 499,
    category: "Non-Fiction",
    isbn: "978-0-06-231609-7",
    publisher: "Harper",
    publishedYear: 2011,
    pages: 443,
    language: "English",
    stock: 35,
    imageUrl: "https://via.placeholder.com/200x300/4facfe/ffffff?text=Sapiens",
    rating: 4.6
  },
  {
    _id: '5',
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "A handbook of agile software craftsmanship with principles and best practices.",
    price: 599,
    category: "Technology",
    isbn: "978-0-13-235088-4",
    publisher: "Prentice Hall",
    publishedYear: 2008,
    pages: 464,
    language: "English",
    stock: 45,
    imageUrl: "https://via.placeholder.com/200x300/43e97b/ffffff?text=Clean+Code",
    rating: 4.7
  },
  {
    _id: '6',
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "The magical adventure of a young wizard discovering his destiny at Hogwarts.",
    price: 399,
    category: "Fantasy",
    isbn: "978-0-7475-3269-9",
    publisher: "Bloomsbury",
    publishedYear: 1997,
    pages: 223,
    language: "English",
    stock: 70,
    imageUrl: "https://via.placeholder.com/200x300/667eea/ffffff?text=Harry+Potter",
    rating: 4.9
  },
  {
    _id: '7',
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy and proven way to build good habits and break bad ones.",
    price: 449,
    category: "Self-Help",
    isbn: "978-0-7352-1129-2",
    publisher: "Avery",
    publishedYear: 2018,
    pages: 320,
    language: "English",
    stock: 80,
    imageUrl: "https://via.placeholder.com/200x300/f093fb/ffffff?text=Atomic+Habits",
    rating: 4.8
  },
  {
    _id: '8',
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel of manners exploring themes of love, marriage, and social class.",
    price: 249,
    category: "Romance",
    isbn: "978-0-14-143951-8",
    publisher: "T. Egerton",
    publishedYear: 1813,
    pages: 279,
    language: "English",
    stock: 42,
    imageUrl: "https://via.placeholder.com/200x300/4facfe/ffffff?text=Pride+and+Prejudice",
    rating: 4.6
  }
];

// Simple auth routes (in-memory)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone, address } = req.body;
  
  // Check if user exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists with this email' });
  }
  
  const user = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    address
  };
  
  users.push({ ...user, password });
  
  res.status(201).json({
    message: 'User registered successfully',
    token: 'demo-token-' + user.id,
    user
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  
  const { password: pwd, ...userWithoutPassword } = user;
  
  res.json({
    message: 'Login successful',
    token: 'demo-token-' + user.id,
    user: userWithoutPassword
  });
});

// Books routes
app.get('/api/books', (req, res) => {
  const { category, search } = req.query;
  let filteredBooks = [...books];
  
  if (category && category !== 'all') {
    filteredBooks = filteredBooks.filter(book => book.category === category);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredBooks = filteredBooks.filter(book => 
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    );
  }
  
  res.json(filteredBooks);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b._id === req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Online Bookstore API',
    note: 'Running with in-memory data (MongoDB not required)',
    endpoints: {
      books: '/api/books',
      auth: '/api/auth/login, /api/auth/register'
    }
  });
});

console.log('⚠️  Running in DEMO mode with in-memory data (MongoDB not connected)');
console.log('📚 Sample books loaded:', books.length);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server is running on http://localhost:${PORT}`);
  console.log('✓ Frontend should connect to: http://localhost:3000');
});
