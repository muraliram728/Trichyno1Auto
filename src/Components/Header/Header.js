import React, { useState } from 'react';
import './headerstyles.css';
import { FaBars } from "react-icons/fa";
import bannerimage from "../../assets/images/bgauto.avif";
import { NavLink } from 'react-router-dom';
import Logout from './Logout';

const Header = () => {
  const [isopen, setIsopen] = useState(false);

  const toggleMenu = () => {
    setIsopen(!isopen);
  };

  const closeMenu = () => {
    setIsopen(false);
  };

  return (
    <>
      <header>
        <div className='Container'>
          <div className='logo'>
            <h2><span className='highlight-word-color'>Trichy</span> No..1 Auto</h2>
          </div>
          <div className='Horizontal-Line'></div>
          <nav>
            <ul className={isopen ? "nav-link active" : "nav-link"}>
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={closeMenu} // Close the menu when clicked
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={closeMenu} // Close the menu when clicked
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/Login" 
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={closeMenu} // Close the menu when clicked
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/Signup" 
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={closeMenu} // Close the menu when clicked
                >
                  Signup
                </NavLink>
              </li>
              <li className="logout-container">
                <Logout />
              </li>
            </ul>
            <div className='icon' onClick={toggleMenu}>
              <FaBars />
            </div>
          </nav>
        </div>
      </header>
      <div className="banner">
        <img src={bannerimage} alt="Banner" className="banner-image" />
        <div className="banner-text">
          <h1><span className='highlight-word-color'>Trichy</span> No.1 Auto</h1>
          <p>Drivers Welfare Association</p>
          <h2>திருச்சி No.1 ஆட்டோ ஓட்டுனர் நலச்சங்கம்</h2>
          <p>"விரைவான சேவை. பாதுகாப்பான பயணம்."</p>
        </div>
      </div>
    </>
  );
};

export default Header;
