const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const sampleBooks = [
  {
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
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    description: "A gene-centered view of evolution that revolutionized our understanding of natural selection.",
    price: 399,
    category: "Science",
    isbn: "978-0-19-929115-1",
    publisher: "Oxford University Press",
    publishedYear: 1976,
    pages: 360,
    language: "English",
    stock: 25,
    imageUrl: "https://via.placeholder.com/200x300/00f2fe/ffffff?text=The+Selfish+Gene",
    rating: 4.5
  },
  {
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
    title: "Steve Jobs",
    author: "Walter Isaacson",
    description: "The exclusive biography of the Apple founder based on extensive interviews.",
    price: 549,
    category: "Biography",
    isbn: "978-1-4516-4853-9",
    publisher: "Simon & Schuster",
    publishedYear: 2011,
    pages: 656,
    language: "English",
    stock: 30,
    imageUrl: "https://via.placeholder.com/200x300/38f9d7/ffffff?text=Steve+Jobs",
    rating: 4.6
  },
  {
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
    title: "The Da Vinci Code",
    author: "Dan Brown",
    description: "A thrilling mystery involving secret societies, ancient mysteries, and religious conspiracy.",
    price: 379,
    category: "Mystery",
    isbn: "978-0-385-50420-1",
    publisher: "Doubleday",
    publishedYear: 2003,
    pages: 454,
    language: "English",
    stock: 55,
    imageUrl: "https://via.placeholder.com/200x300/764ba2/ffffff?text=The+Da+Vinci+Code",
    rating: 4.3
  },
  {
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
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    description: "An exploration of cosmology, black holes, and the nature of time itself.",
    price: 429,
    category: "Science",
    isbn: "978-0-553-38016-3",
    publisher: "Bantam Books",
    publishedYear: 1988,
    pages: 256,
    language: "English",
    stock: 38,
    imageUrl: "https://via.placeholder.com/200x300/00f2fe/ffffff?text=A+Brief+History+of+Time",
    rating: 4.5
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Insert sample books
    await Book.insertMany(sampleBooks);
    console.log(`Successfully added ${sampleBooks.length} books to the database`);

    mongoose.connection.close();
    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
