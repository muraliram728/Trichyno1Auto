import React, { useState, useEffect } from 'react';
import './Herostyle.css';
import { useNavigate } from 'react-router-dom';
import lowcost from '../../assets/images/lowcost.jpg';
import safe from '../../assets/images/safe.webp';
import auto from '../../assets/images/auto.webp';
import service from '../../assets/images/service.png';
import customer from '../../assets/images/customer.jpg';
import admin from '../../assets/images/admin.jpg';
import { db, auth } from "../../firebase/config"; // Import Firebase
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import { doc, getDoc } from "firebase/firestore";

const Hero = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserName, setCurrentUserName] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

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

  const handleAdminClick = () => navigate('/admin');
  const handleCostClick = () => navigate('/cost');
  const handleTripTrackerClick = () => navigate('/TripTracker');
  const handleserviceClick = () => navigate('/service');
  const handlememberClick = () => navigate('/member');

  return (
    <div className="hero">
      <h2>Welcome,{currentUserName}<span style={{color:'rgb(106, 94, 94)'}} > ({code})</span> </h2>
      <p>Trichy No.1 Auto</p>
      <div className="image-section">
        <div className="image-container" onClick={handleCostClick}>
          <img src={lowcost} alt="Low Cost" />
          <p>Low Cost</p>
        </div>
        <div className="image-container">
          <img src={safe} alt="Safe" />
          <p>Safe</p>
        </div>
        <div className="image-container">
          <img src={auto} alt="Auto" onClick={handleTripTrackerClick} />
          <p>TripTracker</p>
        </div>
        <div className="image-container">
          <img src={service} alt="Service" onClick={handleserviceClick} />
          <p>Service</p>
        </div>
        <div className="image-container">
          <img src={customer} alt="Customer" onClick={handlememberClick} />
          <p>Members</p>
        </div>
        <div className="image-container" onClick={handleAdminClick}>
          <img src={admin} alt="Admin" />
          <p>Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
