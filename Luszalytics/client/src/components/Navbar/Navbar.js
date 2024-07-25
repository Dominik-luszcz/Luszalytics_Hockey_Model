import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Luszalytics
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pwaa" className="nav-links">
              PWAA
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/percentile-search" className="nav-links">
              Percentile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
