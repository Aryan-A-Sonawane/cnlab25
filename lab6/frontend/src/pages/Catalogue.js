import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Catalogue() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchBooks();
  }, [selectedCategory, searchTerm]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await axios.get('/api/books', { params });
      setBooks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating));
  };

  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  return (
    <div className="catalogue">
      <div className="container">
        <div className="catalogue-header">
          <h1>Book Catalogue</h1>
          <p>Explore our collection of amazing books</p>
        </div>

        {/* Search and Filter */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="all">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="History">History</option>
            <option value="Biography">Biography</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Self-Help">Self-Help</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Books Grid */}
        {books.length > 0 ? (
          <div className="books-grid">
            {books.map((book) => (
              <div key={book._id} className="book-card">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="book-image"
                />
                <div className="book-details">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <span className="book-category">{book.category}</span>
                  <div className="book-rating">
                    {renderStars(book.rating)} ({book.rating})
                  </div>
                  <p className="book-price">₹{book.price}</p>
                  <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    {book.description.substring(0, 100)}...
                  </p>
                  <button className="btn-add-cart">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-books">
            <p>No books found. Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalogue;
