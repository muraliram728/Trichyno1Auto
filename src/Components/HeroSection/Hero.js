import React, { useState, useEffect } from "react";
import "./Herostyle.css";
import { useNavigate } from "react-router-dom";
import lowcost from "../../assets/images/lowcost.jpg";
import safe from "../../assets/images/safe.webp";
import auto from "../../assets/images/auto.png";
import service from "../../assets/images/service.png";
import customer from "../../assets/images/customer.jpg";
import admin from "../../assets/images/admin.jpg";
import Advertisement from "./ImageSlider/ImageSlider";
import Review from "./Review/Review";
import Subfooter from "./subfooter/subfooter";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Hero = () => {
  const navigate = useNavigate();
  const handleAdminClick = () => navigate("/admin");
  const handleCostClick = () => navigate("/cost");
  const handleTripTrackerClick = () => navigate("/TripTracker");
  const handleserviceClick = () => navigate("/service");
  const handlememberClick = () => navigate("/member");
  const handleSafeClick = () => navigate("/Safe");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserName, setCurrentUserName] = useState("");
  const [code, setCode] = useState("");
  const [welcom, setWelcom] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user); // Set current user details
        setCurrentUserName(user.displayName);
        setWelcom(true);

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

  return (
    <div className="hero">
      <div>
        <Advertisement />
      </div>
      <div className="image-section">
        {welcom && (
          <h2>
            Welcome,{currentUserName}
            <span style={{ color: "rgb(106, 94, 94)" }}> ({code})</span>{" "}
          </h2>
        )}
        <div className="row">
          <motion.div
            className="image-container"
            onClick={handleCostClick}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={lowcost} alt="Low Cost" />
            <p>Low Cost</p>
          </motion.div>
          <motion.div
            className="image-container"
            onClick={handleSafeClick}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={safe} alt="Safe" onClick={handleSafeClick} />
            <p>Safe</p>
          </motion.div>
          <motion.div
            className="image-container"
            onClick={handleTripTrackerClick}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={auto} alt="Auto" onClick={handleTripTrackerClick} />
            <p>TripTracker</p>
          </motion.div>
        </div>
        <div className="row">
          <motion.div
            className="image-container"
            onClick={handleserviceClick}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={service} alt="Service" onClick={handleserviceClick} />
            <p>Service</p>
          </motion.div>
          <motion.div
            className="image-container"
            onClick={handlememberClick}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={customer} alt="Customer" onClick={handlememberClick} />
            <p>Members</p>
          </motion.div>
          <motion.div
            className="image-container"
            onClick={handleAdminClick}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={admin} alt="Admin" />
            <p>Admin</p>
          </motion.div>
        </div>
      </div>
      {/* <Review /> */}
      <Subfooter />
    </div>
  );
};

export default Hero;
