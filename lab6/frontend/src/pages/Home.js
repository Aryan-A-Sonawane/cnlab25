import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to Online Bookstore</h1>
          <p>Discover thousands of books at your fingertips</p>
          <Link to="/catalogue" className="btn-primary">
            Browse Books
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Wide Selection</h3>
              <p>Thousands of books across all genres and categories to choose from</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery right to your doorstep</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive prices and regular discounts on popular titles</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Safe and secure payment options for your peace of mind</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Top Rated</h3>
              <p>Curated collection of highly rated books by readers worldwide</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy to Use</h3>
              <p>Simple and intuitive interface for seamless browsing experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="hero" style={{ padding: '3rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Start Your Reading Journey Today</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Join thousands of book lovers and get access to our extensive collection
          </p>
          <Link to="/register" className="btn-primary">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
