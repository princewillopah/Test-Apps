// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

 // Alternative image URLs using Pexels (replace the destinations array with this):
const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    description: "Famous for its stunning sunsets, white-washed buildings, and crystal blue waters.",
    image: "https://images.pexels.com/photos/210394/pexels-photo-210394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "$$$",
    rating: 4.9,
    category: "Beach"
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    description: "Experience traditional temples, cherry blossoms, and exquisite Japanese culture.",
    image: "https://images.pexels.com/photos/685079/pexels-photo-685079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "$$",
    rating: 4.8,
    category: "Culture"
  },
  {
    id: 3,
    name: "Serengeti, Tanzania",
    description: "Witness the great migration and experience Africa's most famous wildlife reserve.",
    image: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "$$$$",
    rating: 4.9,
    category: "Adventure"
  },
  {
    id: 4,
    name: "Paris, France",
    description: "The city of love with iconic landmarks, exquisite cuisine, and timeless elegance.",
    image: "https://images.pexels.com/photos/977319/pexels-photo-977319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "$$$",
    rating: 4.7,
    category: "City"
  },
  {
    id: 5,
    name: "Banff, Canada",
    description: "Stunning mountain landscapes, turquoise lakes, and incredible hiking opportunities.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: "$$$",
    rating: 4.8,
    category: "Nature"
  },
  {
    id: 6,
    name: "Marrakech, Morocco",
    description: "Vibrant markets, stunning architecture, and rich cultural experiences in the medina.",
    image: "https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "$$",
    rating: 4.6,
    category: "Culture"
  }
];
  const categories = ["All", "Beach", "Culture", "Adventure", "City", "Nature"];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDestinations = activeCategory === "All" 
    ? destinations 
    : destinations.filter(dest => dest.category === activeCategory);

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <div className="logo-icon">✈️</div>
          <h1>Wanderlust</h1>
        </div>
        <nav className="navigation">
          <a href="#explore" className="nav-link">Explore</a>
          <a href="#destinations" className="nav-link">Destinations</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
        <button className="cta-button">Plan Trip</button>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">Discover Your Next Adventure</h2>
          <p className="hero-subtitle">Explore breathtaking destinations around the world with our curated travel experiences.</p>
          <div className="search-bar">
            <input type="text" placeholder="Where to next?" className="search-input" />
            <button className="search-button">Search</button>
          </div>
        </div>
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80 " 
          alt="Beautiful landscape" 
          className="hero-image"
        />
      </section>

      {/* Category Filter */}
      <section className="category-filter">
        <div className="container">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="destinations">
        <div className="container">
          <h2 className="section-title">Featured Destinations</h2>
          <div className="destinations-grid">
            {filteredDestinations.map(destination => (
              <div 
                key={destination.id} 
                className={`destination-card ${selectedDestination === destination.id ? 'selected' : ''}`}
                onClick={() => setSelectedDestination(selectedDestination === destination.id ? null : destination.id)}
              >
                <div className="card-image-container">
                  <img src={destination.image} alt={destination.name} className="card-image" />
                  <div className="price-badge">{destination.price}</div>
                  <div className="rating-badge">
                    <span>⭐</span> {destination.rating}
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{destination.name}</h3>
                  <p className="card-description">{destination.description}</p>
                  <div className="card-footer">
                    <span className="category-tag">{destination.category}</span>
                    <button className="explore-button">Explore</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Get Travel Inspiration</h2>
            <p>Subscribe to our newsletter for exclusive travel deals and destination guides.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button className="subscribe-button">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo-icon">✈️</div>
              <h3>Wanderlust</h3>
            </div>
            <div className="footer-links">
              <div className="link-column">
                <h4>Explore</h4>
                <a href="#beach">Beach Destinations</a>
                <a href="#mountains">Mountain Escapes</a>
                <a href="#cities">City Breaks</a>
                <a href="#adventure">Adventure Trips</a>
              </div>
              <div className="link-column">
                <h4>Company</h4>
                <a href="#about">About Us</a>
                <a href="#team">Our Team</a>
                <a href="#careers">Careers</a>
                <a href="#press">Press</a>
              </div>
              <div className="link-column">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#safety">Safety</a>
                <a href="#terms">Terms of Service</a>
                <a href="#privacy">Privacy Policy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 Wanderlust. All rights reserved.</p>
            <div className="social-icons">
              <a href="#facebook">📘</a>
              <a href="#instagram">📷</a>
              <a href="#twitter">🐦</a>
              <a href="#pinterest">📌</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {selectedDestination && (
        <div className="modal-overlay" onClick={() => setSelectedDestination(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedDestination(null)}>✕</button>
            <div className="modal-content">
              <img 
                src={destinations.find(d => d.id === selectedDestination).image} 
                alt={destinations.find(d => d.id === selectedDestination).name}
                className="modal-image"
              />
              <div className="modal-text">
                <h2>{destinations.find(d => d.id === selectedDestination).name}</h2>
                <div className="modal-rating">
                  <span>⭐ {destinations.find(d => d.id === selectedDestination).rating}</span>
                  <span className="price">{destinations.find(d => d.id === selectedDestination).price}</span>
                </div>
                <p>{destinations.find(d => d.id === selectedDestination).description}</p>
                <p>Our expert guides will take you on a journey through the most beautiful spots, hidden gems, and local experiences that you won't find in guidebooks. From sunrise to sunset, experience the destination like a local.</p>
                <button className="book-now-button">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;