import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config"; // Import Firebase
import { doc, getDoc, addDoc, collection } from "firebase/firestore";

const TripTracker = () => {
  const [distance, setDistance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(0);
  const [pricePerKm, setPricePerKm] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [lastPosition, setLastPosition] = useState(null);

  // Fetch price per km from Firestore
  useEffect(() => {
    const fetchPrice = async () => {
      const priceDocRef = doc(db, "price", "currentPrice");
      const priceDoc = await getDoc(priceDocRef);
      if (priceDoc.exists()) {
        setPricePerKm(priceDoc.data().pricePerKm);
      } else {
        setPricePerKm(10); // Default price if not found
      }
    };

    fetchPrice();
  }, []);

  // Function to calculate distance between two coordinates (Haversine Formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInMeters = R * c * 1000; // Distance in meters

    console.log(`Calculated Distance: ${distanceInMeters.toFixed(2)} meters`);

    return distanceInMeters;
  };

  // Start trip
  const startTrip = () => {
    setIsRunning(true);
    setTime(0);
    setDistance(0);
    setAmount(0);
    setLastPosition(null);
    let isFirstUpdate = true; // Ignore the first GPS update
  
    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 20000,
      distanceFilter: 5, // Reduce to 5m for smoother updates
    };
  
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("New Position:", latitude, longitude);
  
        setLastPosition((prevPosition) => {
          if (isFirstUpdate) {
            console.log("Ignoring first GPS update...");
            isFirstUpdate = false;
            return { lat: latitude, lon: longitude };
          }
  
          if (!prevPosition) return { lat: latitude, lon: longitude };
  
          const dist = calculateDistance(prevPosition.lat, prevPosition.lon, latitude, longitude);
  
          if (dist > 1000) { // Ignore GPS errors causing large jumps
            console.warn("Ignoring unrealistic GPS jump:", dist);
            return prevPosition;
          }
  
          if (dist >= 5) { // Update only if movement is ≥ 5 meters
            console.log(`Distance updated by: ${dist.toFixed(2)} meters`);
            setDistance((prev) => prev + dist / 1000);
            setAmount((prevAmount) => prevAmount + (dist / 1000) * pricePerKm);
          }
  
          return { lat: latitude, lon: longitude };
        });
      },
      (error) => console.error("Geolocation error:", error),
      options
    );
  
    setWatchId(id);
  
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    setTimerId(interval);
  };
  

  // Stop trip
  const stopTrip = async () => {
    if (watchId) navigator.geolocation.clearWatch(watchId);
    if (timerId) clearInterval(timerId); // Stop the timer
    setIsRunning(false);

    const tripData = {
      distance: distance.toFixed(3), // Show up to 3 decimal places
      amount: amount.toFixed(2),
      time: time,
      pricePerKm: pricePerKm,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "trips"), tripData);
      alert(`Trip ended! Total Fare: ₹${amount.toFixed(2)}`);
    } catch (error) {
      console.error("Error saving trip:", error);
      alert("Failed to save trip.");
    }
  };

  return (
    <div>
      <h2>Trip Tracker</h2>
      <p>Price per km: ₹{pricePerKm}</p>
      <p>Time: {new Date(time * 1000).toISOString().substr(11, 8)}</p>
      <p>Distance: {Math.floor(distance)} km {Math.round((distance % 1) * 1000)} meters</p>
      <p>Amount: ₹{amount.toFixed(2)}</p>

      {!isRunning ? (
        <button onClick={startTrip}>Start Trip</button>
      ) : (
        <button onClick={stopTrip}>Stop Trip</button>
      )}
    </div>
  );
};

export default TripTracker;
