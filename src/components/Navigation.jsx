import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MindFlowLogo from "./MindFlowLogo";
import "./Navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <button className="brand-link" onClick={() => handleNavigation("/")}>
            <MindFlowLogo size={40} />
            <span className="brand-text">MindFlow</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-nav">
          <button
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={() => handleNavigation("/")}
          >
            Home
          </button>
          <button
            className={`nav-link ${
              location.pathname === "/pricing" ? "active" : ""
            }`}
            onClick={() => handleNavigation("/pricing")}
          >
            Pricing
          </button>
          <button
            className="nav-link cta"
            onClick={() => handleNavigation("/auth")}
          >
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="hamburger-button"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-content">
          <button
            className={`mobile-nav-link ${
              location.pathname === "/" ? "active" : ""
            }`}
            onClick={() => handleNavigation("/")}
          >
            Home
          </button>
          <button
            className={`mobile-nav-link ${
              location.pathname === "/pricing" ? "active" : ""
            }`}
            onClick={() => handleNavigation("/pricing")}
          >
            Pricing
          </button>
          <button
            className="mobile-nav-link cta"
            onClick={() => handleNavigation("/auth")}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navigation;
