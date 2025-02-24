import React from "react";
import "./footerstyle.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="Footer">
      <h1 className="footer-header">
        Trichy <span className="footer-highlight-words">No.1 Auto</span>
      </h1>

      <div className="footer-content">
        <div className="footer-column">
          <h3 className="footer-subheader">Services</h3>
          <ul>
            <li>LowCost</li>
            <li>Safe</li>
            <li>Brake Service</li>
            <li>TripTracker</li>
            <li>Service</li>
            <li>Member</li>
            <li>Admin</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-subheader">Location</h3>
          <p style={{ fontSize: "12px" }}>123 Main St, Trichy</p>
        </div>
        <div className="footer-column">
          <h3 className="footer-subheader">Follow Us</h3>
          <ul>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter /> Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
