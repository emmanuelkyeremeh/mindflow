import React from "react";
import { useNavigate } from "react-router-dom";
import MindFlowLogo from "./MindFlowLogo";
import "./PricingPage.css";

const PricingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  const handleUpgrade = () => {
    // TODO: Implement payment integration
    console.log("Upgrade to premium");
  };

  return (
    <div className="pricing-page">
      {/* Header */}
      <header className="pricing-header">
        <div className="header-content">
          <div className="header-left">
            <MindFlowLogo size={40} />
            <h1>MindFlow</h1>
          </div>
          <div className="header-right">
            <button onClick={() => navigate("/")} className="back-button">
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <h2>Choose Your Plan</h2>
          <p>Start free and upgrade when you need more power</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-grid">
            {/* Free Plan */}
            <div className="pricing-card free">
              <div className="pricing-header">
                <h3>Free Plan</h3>
                <div className="price">
                  $0<span>/month</span>
                </div>
                <p className="plan-description">
                  Perfect for getting started with mind mapping
                </p>
              </div>

              <ul className="features-list">
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Up to 5 mind maps</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>AI-powered node expansions</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>3D visualization with Three.js</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Drag, zoom, and rotate in 3D</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Smart connections with Brain.js</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Export to PNG images</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Export to JSON files</span>
                </li>
                <li className="feature-item excluded">
                  <span className="cross">❌</span>
                  <span>PDF export</span>
                </li>
                <li className="feature-item excluded">
                  <span className="cross">❌</span>
                  <span>Unlimited mind maps</span>
                </li>
                <li className="feature-item excluded">
                  <span className="cross">❌</span>
                  <span>Priority support</span>
                </li>
                <li className="feature-item excluded">
                  <span className="cross">❌</span>
                  <span>Advanced AI features</span>
                </li>
                <li className="feature-item excluded">
                  <span className="cross">❌</span>
                  <span>Collaboration tools</span>
                </li>
              </ul>

              <button
                className="pricing-button free-btn"
                onClick={handleGetStarted}
              >
                Get Started Free
              </button>
            </div>

            {/* Premium Plan */}
            <div className="pricing-card premium">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Premium Plan</h3>
                <div className="price">
                  ₵20<span>/month</span>
                </div>
                <p className="plan-description">
                  Everything you need for unlimited creativity
                </p>
              </div>

              <ul className="features-list">
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Unlimited mind maps</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Advanced AI-powered expansions</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Full 3D visualization suite</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Advanced 3D interactions</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Enhanced Brain.js clustering</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>All export formats (PNG, JSON, PDF)</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>High-resolution exports</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Priority customer support</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Advanced AI suggestions</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Collaboration features</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Custom themes and colors</span>
                </li>
                <li className="feature-item included">
                  <span className="check">✅</span>
                  <span>Advanced analytics</span>
                </li>
              </ul>

              <button
                className="pricing-button premium-btn"
                onClick={handleUpgrade}
              >
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="feature-comparison">
        <div className="container">
          <h2>Detailed Feature Comparison</h2>
          <div className="comparison-table">
            <div className="table-header">
              <div className="feature-column">Feature</div>
              <div className="plan-column free">Free</div>
              <div className="plan-column premium">Premium</div>
            </div>

            <div className="table-row">
              <div className="feature-name">Mind Maps</div>
              <div className="plan-value free">5 maps</div>
              <div className="plan-value premium">Unlimited</div>
            </div>

            <div className="table-row">
              <div className="feature-name">AI Expansions</div>
              <div className="plan-value free">Basic (3-5 suggestions)</div>
              <div className="plan-value premium">
                Advanced (5-10 suggestions)
              </div>
            </div>

            <div className="table-row">
              <div className="feature-name">3D Visualization</div>
              <div className="plan-value free">Full 3D support</div>
              <div className="plan-value premium">Enhanced 3D + animations</div>
            </div>

            <div className="table-row">
              <div className="feature-name">Export Options</div>
              <div className="plan-value free">PNG, JSON</div>
              <div className="plan-value premium">PNG, JSON, PDF, SVG</div>
            </div>

            <div className="table-row">
              <div className="feature-name">Resolution</div>
              <div className="plan-value free">Standard (1080p)</div>
              <div className="plan-value premium">High-res (4K)</div>
            </div>

            <div className="table-row">
              <div className="feature-name">Support</div>
              <div className="plan-value free">Community</div>
              <div className="plan-value premium">Priority email support</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Can I upgrade from Free to Premium anytime?</h3>
              <p>
                Yes! You can upgrade to Premium at any time. Your existing mind
                maps will be preserved, and you'll immediately get access to all
                Premium features.
              </p>
            </div>

            <div className="faq-item">
              <h3>What happens to my mind maps if I cancel?</h3>
              <p>
                Your mind maps are always yours. If you cancel Premium, you'll
                keep access to your existing maps but won't be able to create
                new ones beyond the free limit.
              </p>
            </div>

            <div className="faq-item">
              <h3>Is the AI expansion feature really free?</h3>
              <p>
                Yes! Free users get AI-powered node expansions using DeepSeek.
                Premium users get enhanced AI with more suggestions and better
                context understanding.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I export my mind maps?</h3>
              <p>
                Absolutely! Free users can export to PNG and JSON formats.
                Premium users get additional PDF and SVG export options with
                higher resolution.
              </p>
            </div>

            <div className="faq-item">
              <h3>How does the 3D visualization work?</h3>
              <p>
                All users get full 3D mind mapping with Three.js - drag, zoom,
                and rotate your maps in 3D space. Premium users get additional
                animations and effects.
              </p>
            </div>

            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>
                We accept all major credit cards, PayPal, and mobile money
                through Paystack. All payments are processed securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>
            Join thousands of creators who are already using MindFlow to
            visualize their ideas
          </p>
          <div className="cta-buttons">
            <button className="cta-button free" onClick={handleGetStarted}>
              Start Free Now
            </button>
            <button className="cta-button premium" onClick={handleUpgrade}>
              Go Premium
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pricing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <MindFlowLogo size={32} />
                <h3>MindFlow</h3>
              </div>
              <p>AI-powered 3D mind mapping for creative thinkers.</p>
            </div>
            <div className="footer-links">
              <a href="/">Home</a>
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

export default PricingPage;
