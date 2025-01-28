import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./AdminStyle.css";

const Admin = () => {
  const [pricePerKm, setPricePerKm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminStatusAndPrice = async () => {
      setLoading(true);

      try {
        // Ensure the user is logged in
        const user = auth.currentUser;
        if (!user) {
          alert("Unauthorized Access. Please login.");
          navigate("/login"); // Redirect to login page
          return;
        }

        // Fetch user details from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Check if the user is an admin
          if (userData.isAdmin) {
            // Fetch the current price from Firestore
            const priceDocRef = doc(db, "price", "currentPrice");
            const priceDoc = await getDoc(priceDocRef);

            if (priceDoc.exists()) {
              setPricePerKm(priceDoc.data().pricePerKm.toString());
            } else {
              setPricePerKm(""); // Set to empty if no price is found
            }
          } else {
            alert("Unauthorized Access");
            navigate("/"); // Redirect non-admin users to the homepage
          }
        } else {
          alert("User not found");
          navigate("/"); // Redirect if user details are missing
        }
      } catch (error) {
        if (error.code === "permission-denied") {
          alert("You do not have permission to access this data.");
        } else {
          console.error("Error fetching admin status or price:", error);
          alert("An unexpected error occurred. Please try again.");
        }
      }

      setLoading(false);
    };

    fetchAdminStatusAndPrice();
  }, [navigate]);

  // Save price to Firestore
  const handlePriceChange = async () => {
    if (pricePerKm.trim() === "") {
      alert("Please enter a valid price");
      return;
    }

    try {
      const priceDocRef = doc(db, "price", "currentPrice"); // Document ID: currentPrice
      await setDoc(priceDocRef, { pricePerKm: Number(pricePerKm) });
      alert("Price updated successfully!");
    } catch (error) {
      if (error.code === "permission-denied") {
        alert("You do not have permission to update the price.");
      } else {
        console.error("Error updating price:", error);
        alert("Failed to update price. Please try again.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <label>
        Price per km:
        <input
          type="number"
          value={pricePerKm}
          onChange={(e) => setPricePerKm(e.target.value)}
          placeholder="e.g., 10"
        />
      </label>
      <button onClick={handlePriceChange}>Set Price</button>
      <p>Current Price: {pricePerKm ? `${pricePerKm} Rs/km` : "Not set"}</p>
    </div>
  );
};

export default Admin;
