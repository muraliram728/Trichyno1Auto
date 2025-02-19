import React, { useState, useEffect } from 'react';
import './headerstyles.css';
import { FaBars } from "react-icons/fa";
import bannerimage from "../../assets/images/Headerimg.png";
import { NavLink } from 'react-router-dom';
import Logout from './Logout';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth,db } from "../../firebase/config"; // Firebase auth
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged



const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserName, setCurrentUserName] = useState('');
  const [code, setCode] = useState('');
  const [isopen, setIsopen] = useState(false);
  const [user] = useAuthState(auth); // Get logged-in user

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log("Current User Details:");
          console.log(`DisplayName: ${user.displayName}`);
          console.log(`Email: ${user.email}`);
          console.log(`UID: ${user.uid}`);
          console.log(`Photo URL: ${user.photoURL}`);
          
          setCurrentUser(user); // Set current user details
          setCurrentUserName(user.displayName);
  
          // Fetch additional user data from Firestore (assuming 'users' is your collection name)
          const docRef = doc(db, "users", user.uid); // Get the user's document based on their UID
          try {
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setCode(userData.code); // Set the 'code' value from Firestore
              console.log(`code: ${userData.code}`);
            } else {
              console.log("No additional user data found.");
            }
          } catch (error) {
            console.log("Error fetching user data:", error);
          }
        } else {
          console.log("No user is logged in.");
          setCurrentUser(null); // Clear user data if no one is logged in
        }
      });
  
      // Cleanup the listener on component unmount
      return () => unsubscribe();
    }, []);

  const toggleMenu = () => {
    setIsopen(!isopen);
  };

  const closeMenu = () => {
    setIsopen(false);
  };

  return (
      <header>
        <div className='Container'>
          <nav>
            <ul className={isopen ? "nav-link active" : "nav-link"}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? 'active' : '')}
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
                    className={({ isActive }) => (isActive ? 'active' : '')}
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
            <div className='icon' onClick={toggleMenu}>
              <FaBars />
            </div>
          </nav>
        </div>
        <div className="banner-container">
          <div className="banner-text">
          <h2>Welcome,{currentUserName}<span style={{color:'rgb(106, 94, 94)'}} > ({code})</span> </h2>
            <h1><span className='highlight-word'>Trichy</span> No.1 Auto</h1>
            <h5 className='para'>Drivers Welfare Association</h5>
            <p className='forum'>திருச்சி No.1 ஆட்டோ ஓட்டுனர் நலச்சங்கம்</p>
            <p>"விரைவான சேவை. பாதுகாப்பான பயணம்."</p>
          </div>
          <div className="banner-img">
            <img src={bannerimage} alt="Banner" />
          </div>
        </div>
      </header>
  );
};

export default Header;
