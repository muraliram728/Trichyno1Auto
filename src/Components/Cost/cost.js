import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../../firebase/config'; // Your firebase config file

const Cost = () => {
  const [price, setPrice] = useState(null); // For storing price from Firebase
  const [kilometer, setKilometer] = useState('');
  const [finalPrice, setFinalPrice] = useState(null); // For storing the calculated final price

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const db = getFirestore();
        const priceDocRef = doc(db, 'price', 'currentPrice'); // Correct collection name "price"
        const docSnap = await getDoc(priceDocRef);

        if (docSnap.exists()) {
          const fetchedPrice = docSnap.data().pricePerKm; // Correct field name "pricePerKm"
          setPrice(fetchedPrice);
          console.log("Price fetched from Firebase:", fetchedPrice);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    };

    fetchPrice();
  }, []);

  // Handle form submission to calculate final price
  const handleSubmit = (e) => {
    e.preventDefault();

    if (price && kilometer) {
      const calculatedPrice = price * parseInt(kilometer, 10); // Multiply price by kilometers
      setFinalPrice(calculatedPrice); // Set the final calculated price
    } else {
      console.log('Price or kilometer is missing');
    }
  };

  return (
    <div className="cost-container">
      <h2 className="costtitle">Cost Calculator</h2>
      {price !== null ? <h4>Cost per Km: ₹{price}</h4> : <h4>Loading price...</h4>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Kilometer:</label>
          <input
            type="number"
            placeholder="Enter kilometers"
            value={kilometer}
            onChange={(e) => setKilometer(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculate Cost</button>
      </form>

      {/* Display final price if it's calculated */}
      {finalPrice !== null && (
        <div className="final-price">
          <h3>Final Price: ₹{finalPrice}</h3>
        </div>
      )}
    </div>
  );
};

export default Cost;
