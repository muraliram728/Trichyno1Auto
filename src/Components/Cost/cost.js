import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./cost.css"

const Cost = () => {
  const [pricingDetails, setPricingDetails] = useState(null); // Store price details

  useEffect(() => {
    const fetchPricingDetails = async () => {
      try {
        const db = getFirestore();
        const priceDocRef = doc(db, "price", "currentPrice"); // Reference to price document
        const docSnap = await getDoc(priceDocRef);

        if (docSnap.exists()) {
          setPricingDetails(docSnap.data()); // Store all pricing details
        } else {
          console.log("No pricing details found!");
        }
      } catch (error) {
        console.error("Error fetching pricing details:", error);
      }
    };

    fetchPricingDetails();
  }, []);

  return (
    <div className="cost-container">
      <h2 className="cost-title">Pricing Details</h2>

      {/* Show loading while fetching data */}
      {!pricingDetails ? (
        <p>Loading price details...</p>
      ) : (
        <div className="price-list">
          <div className="price-card">
            <h3>Cost per 1 Km</h3>
            <p>₹{pricingDetails.pricePer1Km}</p>
          </div>
          <div className="price-card">
            <h3>Cost per Km</h3>
            <p>₹{pricingDetails.pricePerKm}</p>
          </div>
          <div className="price-card">
            <h3>Waiting Fee</h3>
            <p>₹{pricingDetails.waitingFee} per minute</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cost;
