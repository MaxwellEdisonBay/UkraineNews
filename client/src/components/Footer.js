import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      {/* <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join the Adventure newsletter to receive our best vacation deals
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time
        </p>
        <div className="inputt-areas">
          <form>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="footer-input"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section> */}
      {/* <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to="/sign-up">How it works</Link>
            <Link to="/">Testimonials</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Investors</Link>
            <Link to="/">Terms of Service</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="/">Contact</Link>
            <Link to="/">Support</Link>
            <Link to="/">Destinations</Link>
            <Link to="/">Sponsorships</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Videos</h2>
            <Link to="/">Submit Video</Link>
            <Link to="/">Ambassadors</Link>
            <Link to="/">Agency</Link>
            <Link to="/">Influencer</Link>
          </div>
          <div className="footer-link-items">
            <h2>Social Media</h2>
            <Link to="/">Instagram</Link>
            <Link to="/">Facebook</Link>
            <Link to="/">Youtube</Link>
            <Link to="/">Twitter</Link>
          </div>
        </div>
      </div> */}
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              Válka UA <img src="/ukraine.png" alt="Logo" className="ukraine" />
            </Link>
          </div>
          <small className="website-rights">Válka na Ukrajině © 2022</small>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/groups/valkaua"
              className="social-icon-link facebook"
              target="_blank"
              rel="noreferrer noopener"
            >
              <i className="fab fa-facebook-f" />
            </a>

            <Link
              className="social-icon-link instagram"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </Link>
            <a
              href="https://t.me/+FuQBPSBkQ_NmMGFi"
              className="social-icon-link facebook"
              target="_blank"
              rel="noreferrer noopener"
            >
              <i className="fab fa-telegram" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
