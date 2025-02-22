import React, { useState, useEffect } from "react";
import "./headerstyles.css";
import { FaBars } from "react-icons/fa";
import bannerimage from "../../assets/images/Headerimg.png";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import Logo from "../../assets/images/TRYNO1AUTO LOGO.png";

const Header = () => {
  const [isopen, setIsopen] = useState(false);
  const [user] = useAuthState(auth);

  const toggleMenu = () => {
    setIsopen(!isopen);
  };

  const closeMenu = () => {
    setIsopen(false);
  };

  return (
    <header>
      <div className="banner-container">
        <div>
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className="banner-text">
          <h1>
            <span className="highlight-word">Trichy</span> No.1 Auto
          </h1>
          <h5 className="para">Drivers Welfare Association</h5>
          <p className="forum">திருச்சி No.1 ஆட்டோ ஓட்டுனர் நலச்சங்கம்</p>
          <p>"விரைவான சேவை. பாதுகாப்பான பயணம்."</p>
        </div>
        <div>
          <img src={bannerimage} alt="Banner" className="banner-img" />
        </div>
      </div>

      <div className="Container">
        <nav>
          <ul className={isopen ? "nav-link active" : "nav-link"}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>

            {/* Show Register/Login only if user is NOT logged in */}
            {!user && (
              <li>
                <NavLink
                  to="/Signup"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeMenu}
                >
                  Register/Login
                </NavLink>
              </li>
            )}

            {/* Show Logout only if user IS logged in */}
            {user && (
              <li className="logout-container">
                <Logout />
              </li>
            )}
          </ul>
          <div className="icon" onClick={toggleMenu}>
            <FaBars />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
