import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MindFlowLogo from "./MindFlowLogo";
import Navigation from "./Navigation";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create floating particles animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Get the landing page container dimensions
    const landingPage = canvas.parentElement;
    const updateCanvasSize = () => {
      canvas.width = landingPage.offsetWidth;
      canvas.height = landingPage.offsetHeight;
    };

    updateCanvasSize();

    const particles = [];
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#A8E6CF",
      "#FFB6C1",
    ];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="landing-page">
      <Navigation />
      <canvas
        ref={canvasRef}
        className="particles-canvas"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="logo-container">
              <MindFlowLogo size={60} />
              <h1>
                Welcome to <span className="brand-name">MindFlow</span>
              </h1>
            </div>
            <p className="hero-subtitle">
              Transform your ideas into stunning 3D mind maps with AI-powered
              expansions. Visualize, connect, and explore your thoughts like
              never before in an immersive three-dimensional space.
            </p>
            <div className="hero-actions">
              <button className="cta-button primary" onClick={handleGetStarted}>
                <span>Start Creating</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="cta-button secondary"
                onClick={() =>
                  document
                    .getElementById("features")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Features
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="mindmap-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span style={{ background: "#FF6B6B" }}></span>
                  <span style={{ background: "#4ECDC4" }}></span>
                  <span style={{ background: "#45B7D1" }}></span>
                </div>
                <div className="preview-title">3D Mind Map</div>
              </div>
              <div className="preview-3d">
                <div className="central-node">
                  <div className="node-content">Central Idea</div>
                </div>
                <div className="connected-nodes">
                  <div className="node node-1" style={{ "--delay": "0s" }}>
                    AI
                  </div>
                  <div className="node node-2" style={{ "--delay": "0.2s" }}>
                    Design
                  </div>
                  <div className="node node-3" style={{ "--delay": "0.4s" }}>
                    Future
                  </div>
                  <div className="node node-4" style={{ "--delay": "0.6s" }}>
                    Innovation
                  </div>
                </div>
                <div className="connection-lines">
                  <div className="line line-1"></div>
                  <div className="line line-2"></div>
                  <div className="line line-3"></div>
                  <div className="line line-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Unleash Your Creative Mind</h2>
          <div className="features-grid">
            <div className="feature-card feature-1">
              <div className="feature-icon">🧠</div>
              <h3>AI-Powered Expansion</h3>
              <p>
                Let DeepSeek AI suggest related concepts and ideas
                automatically. Just click "Expand with AI" and watch your mind
                map grow intelligently.
              </p>
            </div>
            <div className="feature-card feature-2">
              <div className="feature-icon">🌐</div>
              <h3>3D Visualization</h3>
              <p>
                Navigate your ideas in stunning 3D space. Drag, zoom, and rotate
                to explore connections from every angle with Three.js.
              </p>
            </div>
            <div className="feature-card feature-3">
              <div className="feature-icon">🔗</div>
              <h3>Smart Connections</h3>
              <p>
                Brain.js clusters related concepts locally to avoid repetitive
                suggestions and create meaningful connections between your
                ideas.
              </p>
            </div>
            <div className="feature-card feature-4">
              <div className="feature-icon">💾</div>
              <h3>Cloud Sync</h3>
              <p>
                Your mind maps are automatically saved to Firebase. Access them
                anywhere, anytime, and never lose your creative flow.
              </p>
            </div>
            <div className="feature-card feature-5">
              <div className="feature-icon">📤</div>
              <h3>Export Options</h3>
              <p>
                Share your creations as PNG images, PDF documents, or JSON
                files. Perfect for presentations and collaboration.
              </p>
            </div>
            <div className="feature-card feature-6">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Updates</h3>
              <p>
                See your changes instantly as you build. Smooth animations and
                responsive interactions make the experience delightful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>How MindFlow Works</h2>
          <div className="steps">
            <div className="step step-1">
              <div className="step-number">1</div>
              <h3>Start with an Idea</h3>
              <p>
                Begin with a central concept and watch it come to life in 3D
                space.
              </p>
            </div>
            <div className="step step-2">
              <div className="step-number">2</div>
              <h3>Add Nodes Manually</h3>
              <p>
                Create child nodes by clicking and dragging in the 3D
                environment.
              </p>
            </div>
            <div className="step step-3">
              <div className="step-number">3</div>
              <h3>Expand with AI</h3>
              <p>
                Select any node and let our AI suggest 3-5 related concepts
                automatically.
              </p>
            </div>
            <div className="step step-4">
              <div className="step-number">4</div>
              <h3>Explore & Export</h3>
              <p>
                Navigate your mind map in 3D and export it when you're ready to
                share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Map Your Mind?</h2>
          <p>
            Join thousands of creators who are already using MindFlow to
            visualize and expand their ideas in 3D.
          </p>
          <button
            className="cta-button primary large"
            onClick={handleGetStarted}
          >
            Start Your Mind Map Journey
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <MindFlowLogo size={32} />
                <h3>MindFlow</h3>
              </div>
              <p>
                AI-powered 3D mind mapping for creative thinkers and innovators.
              </p>
            </div>
            <div className="footer-links">
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="/pricing">Pricing</a>
              <a href="/auth">Get Started</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 MindFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
