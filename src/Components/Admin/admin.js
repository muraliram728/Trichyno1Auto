import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./AdminStyle.css";

const Admin = () => {
  const [pricePerKm, setPricePerKm] = useState("");
  const [pricePer1Km, setPricePer1Km] = useState("");
  const [waitingFee, setWaitingFee] = useState(""); // ✅ Fixed state name
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminStatusAndPrice = async () => {
      setLoading(true);

      try {
        const user = auth.currentUser;
        if (!user) {
          alert("Unauthorized Access. Please login.");
          navigate("/login");
          return;
        }

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          if (userData.isAdmin) {
            const priceDocRef = doc(db, "price", "currentPrice");
            const priceDoc = await getDoc(priceDocRef);

            if (priceDoc.exists()) {
              const data = priceDoc.data();
              setPricePerKm(data.pricePerKm.toString() || ""); // ✅ Ensure string format
              setWaitingFee(data.waitingFee?.toString() || ""); // ✅ Fetch waiting fee
              setPricePer1Km(data.pricePer1Km?.toString() || ""); // ✅ Fetch price Per 1Km
            } else {
              setPricePerKm("");
              setWaitingFee(""); // ✅ Initialize waiting fee
              setPricePer1Km("")
            }
          } else {
            alert("Unauthorized Access");
            navigate("/");
          }
        } else {
          alert("User not found");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        alert("An error occurred. Please try again.");
      }

      setLoading(false);
    };

    fetchAdminStatusAndPrice();
  }, [navigate]);

  // ✅ Update Firestore with both price and waiting fee
  const handlePriceChange = async () => {
    if (pricePerKm.trim() === "" || waitingFee.trim() === "" || pricePer1Km.trim() === "") {
      alert("Please enter valid values for both fields");
      return;
    }

    try {
      const priceDocRef = doc(db, "price", "currentPrice");
      await setDoc(priceDocRef, {
        pricePerKm: Number(pricePerKm),
        waitingFee: Number(waitingFee), // ✅ Store waiting fee in Firestore
        pricePer1Km: Number(pricePer1Km), // ✅ Store waiting fee in Firestore

      });

      alert("Price and Waiting Fee updated successfully!");
    } catch (error) {
      console.error("Error updating values:", error);
      alert("Failed to update. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <label>
        Price per km minimum price:
        <input
          type="number"
          value={pricePerKm}
          onChange={(e) => setPricePerKm(e.target.value)}
          placeholder="e.g., 10"
        />
      </label>
      <label>
        Price per 1 km:
        <input
          type="number"
          value={pricePer1Km}
          onChange={(e) => setPricePer1Km(e.target.value)}
          placeholder="e.g., 18"
        />
      </label>
      <label>
        Waiting Fee per minute:
        <input
          type="number"
          value={waitingFee} // ✅ Fixed value binding
          onChange={(e) => setWaitingFee(e.target.value)} // ✅ Fixed onChange
          placeholder="e.g., 2"
        />
      </label>
      <button onClick={handlePriceChange}>Set Price</button>
      <p>minimum price per km: {pricePerKm ? `${pricePerKm} Rs/km` : "Not set"}</p>
      <p>Price per 1 km: {pricePer1Km ? `${pricePer1Km} Rs/km` : "Not set"}</p>
      <p>Current Waiting Fee: {waitingFee ? `${waitingFee} Rs/min` : "Not set"}</p>
    </div>
  );
};

export default Admin;
