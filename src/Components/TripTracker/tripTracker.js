import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config"; // Import Firebase
import { doc, getDoc } from "firebase/firestore";
import './tripTracker.css'

const TripTracker = () => {
  const [distance, setDistance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(0);
  const [pricePerKm, setPricePerKm] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [waitingFee, setWaitingFee] = useState(0);
  const [lastPosition, setLastPosition] = useState(null);

  const [waitingTimeInSeconds, setWaitingTimeInSeconds] = useState(0); // Track waiting time in seconds
  const [totalWaitingFee, setTotalWaitingFee] = useState(0); // Track total waiting fee

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Fetch both price per km and waiting fee from the same document
        const priceDocRef = doc(db, "price", "currentPrice");
        const priceDoc = await getDoc(priceDocRef);

        if (priceDoc.exists()) {
          const priceData = priceDoc.data();

          if (priceData.pricePerKm !== undefined) {
            console.log(`Fetched Price per Km: ₹${priceData.pricePerKm}`);
            setPricePerKm(priceData.pricePerKm);
          } else {
            console.warn("Price per km not found in Firestore.");
          }

          if (priceData.waitingFee !== undefined) {
            console.log(`Fetched Waiting Fee per Minute: ₹${priceData.waitingFee}`);
            setWaitingFee(priceData.waitingFee);
          } else {
            console.warn("Waiting fee not found in Firestore.");
          }
        } else {
          console.error("Document not found at path: price/currentPrice.");
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
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
    const distanceInMeters = R * c * 1000; // Convert to meters

    console.log(`Calculated Distance: ${distanceInMeters.toFixed(2)} meters`);
    return distanceInMeters;
  };

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
      distanceFilter: 2, // Reduce for more frequent updates
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

          if (dist > 0.5) { // Even small movements should count
            console.log(`Movement detected. Distance: ${dist.toFixed(2)} meters`);

            // Updating distance correctly
            setDistance((prev) => {
              const newDistance = prev + dist / 1000; // Convert meters to km
              console.log(`Updated Distance: ${newDistance.toFixed(3)} km`);
              return newDistance;
            });

            // Updating amount correctly
            setAmount((prevAmount) => {
              const newAmount = prevAmount + (dist / 1000) * 50; // ₹50 per km
              console.log(`Updated Amount: ₹${newAmount.toFixed(2)}`);
              return newAmount;
            });
          }

          return { lat: latitude, lon: longitude };
        });
      },
      (error) => console.error("Geolocation error:", error),
      options
    );

    setWatchId(id);

    // Start time counter
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    setTimerId(interval);
  };

  // Start waiting time tracking
  const startWaiting = () => {
    let secondsElapsed = 0; // Track the total time in seconds
    const waitingInterval = setInterval(() => {
      secondsElapsed += 1; // Increment by 1 second

      setWaitingTimeInSeconds(secondsElapsed); // Update waiting time in seconds
      setTotalWaitingFee(Math.floor(secondsElapsed / 60) * waitingFee); // Calculate waiting fee (per minute)

      console.log(`Waiting Time: ${Math.floor(secondsElapsed / 60)} minutes ${secondsElapsed % 60} seconds`);
    }, 1000); // Update every second

    setTimerId(waitingInterval);
  };

  // Stop waiting and calculate total waiting fee
  const stopWaiting = () => {
    if (timerId) clearInterval(timerId); // Stop the timer
    setTotalWaitingFee(Math.floor(waitingTimeInSeconds / 60) * waitingFee); // Calculate total waiting fee
  };

  // Stop trip and calculate total fare
  const stopTrip = () => {
    if (watchId) navigator.geolocation.clearWatch(watchId); // Stop geolocation watch
    if (timerId) clearInterval(timerId); // Clear the time interval

    // Just set the trip to stop without modifying amount again
    setIsRunning(false);
    setDistance(0);
    setTime(0);
  };

  return (
    <div className="trip-tracker">
      <h2>Trip Tracker</h2>

      <div className="trip-detail">
        <span className="label">Price per km:</span>
        <span className="value">₹{pricePerKm}</span>
      </div>

      <div className="trip-detail">
        <span className="label">Trip Time:</span>
        <span className="value">{new Date(time * 1000).toISOString().substr(11, 8)}</span>
      </div>

      <div className="trip-detail">
        <span className="label">Distance:</span>
        <span className="value">{Math.floor(distance)} km {Math.round((distance % 1) * 1000)} m</span>
      </div>

      <div className="trip-detail">
        <span className="label">Distance Amount:</span>
        <span className="value">₹{amount.toFixed(2)}</span>
      </div>

      <div className="trip-detail">
        <span className="label">Waiting Time:</span>
        <span className="value">{Math.floor(waitingTimeInSeconds / 60)} min {waitingTimeInSeconds % 60} sec</span>
      </div>

      <div className="trip-detail">
        <span className="label">Total Waiting Fee:</span>
        <span className="value">₹{totalWaitingFee.toFixed(2)}</span>
      </div>

      {!isRunning ? (
        <button onClick={startTrip}>Start Trip</button>
      ) : (
        <button onClick={stopTrip}>Stop Trip</button>
      )}

      {isRunning && (
        <div className="waiting-buttons">
          <button onClick={startWaiting}>Start Waiting</button>
          <button onClick={stopWaiting}>Stop Waiting</button>
        </div>
      )}

      <h3 className="fare">Total Fare: ₹{(amount + totalWaitingFee).toFixed(2)}</h3>
    </div>


  );
};

export default TripTracker;
