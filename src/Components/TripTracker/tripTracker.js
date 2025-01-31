import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config"; // Import Firebase
import { doc, getDoc } from "firebase/firestore";
import './tripTracker.css';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf"

const TripTracker = () => {
  const [distance, setDistance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(0);
  const [pricePerKm, setPricePerKm] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [waitingFee, setWaitingFee] = useState(0);
  const [pricePer1Km, setPricePer1Km] = useState(0);
  const [lastPosition, setLastPosition] = useState(null);

  const [waitingTimeInSeconds, setWaitingTimeInSeconds] = useState(0); // Track waiting time in seconds
  const [totalWaitingFee, setTotalWaitingFee] = useState(0); // Track total waiting fee
  const [finalTripDetails, setFinalTripDetails] = useState({
    finalWaitingTime: 0,
    finalWaitingFee: 0,
    finalTripTime: 0,
    finalDistance: 0,
    finalDistanceAmount: 0,
  });
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
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
            setWaitingFee(priceData.waitingFee); // Set waitingFee correctly
          } else {
            console.warn("Waiting fee not found in Firestore.");
          }

          if (priceData.pricePer1Km !== undefined) {
            console.log(`Fetched subsequent Fee per 1 km : ₹${priceData.pricePer1Km}`);
            setPricePer1Km(priceData.pricePer1Km); // Set pricePer1Km correctly
          } else {
            console.warn("Subsequent fee per 1 km not found in Firestore.");
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

  const isNightTime = () => {
    const now = new Date();
    const hours = now.getHours();
    // Night time is between 10 PM (22) and 5 AM (5)
    return hours >= 22 || hours < 5;
  };

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
    let isFirstKilometer = true; // Track if it's the first kilometer

    // Determine if it's night time
    const isNight = isNightTime();

    // Use day or night rates based on the current time
    const currentPricePerKm = isNight ? pricePerKm * 1.5 : pricePerKm;
    const currentPricePer1Km = isNight ? pricePer1Km * 1.5 : pricePer1Km;
    const currentWaitingFee = isNight ? waitingFee * 1.5 : waitingFee;

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
            setDistance((prevDistance) => {
              const newDistance = prevDistance + dist / 1000; // Convert meters to km
              console.log(`Updated Distance: ${newDistance.toFixed(3)} km`);
              return newDistance;
            });

            // Updating amount correctly
            setAmount((prevAmount) => {
              let newAmount;
              if (isFirstKilometer && (distance + dist / 1000) >= 1) {
                // If the first kilometer is completed, switch to pricePer1Km
                isFirstKilometer = false;
                newAmount = currentPricePerKm + ((distance + dist / 1000 - 1) * currentPricePer1Km);
              } else if (isFirstKilometer) {
                // If still within the first kilometer, use pricePerKm
                newAmount = prevAmount + (dist / 1000) * currentPricePerKm;
              } else {
                // For subsequent kilometers, use pricePer1Km
                newAmount = prevAmount + (dist / 1000) * currentPricePer1Km;
              }
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

  // Start waiting time tracking (Continues from previous value)
  const startWaiting = () => {
    const isNight = isNightTime();
    const currentWaitingFee = isNight ? waitingFee * 1.5 : waitingFee;

    const startTime = Date.now() - waitingTimeInSeconds * 1000; // Adjust start time based on previous waiting time

    const waitingInterval = setInterval(() => {
      const newElapsedSeconds = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds

      setWaitingTimeInSeconds(newElapsedSeconds); // Update waiting time in seconds

      // Calculate total waiting fee (only for completed minutes)
      const completedMinutes = Math.floor(newElapsedSeconds / 60); // Number of completed minutes
      const totalFee = completedMinutes * currentWaitingFee; // Multiply by currentWaitingFee per minute
      setTotalWaitingFee(totalFee); // Update total waiting fee

      console.log(`Waiting Time: ${completedMinutes} minutes ${newElapsedSeconds % 60} seconds`);
      console.log(`Total Waiting Fee: ₹${totalFee.toFixed(2)}`);
    }, 1000); // Update every second

    setTimerId(waitingInterval);
  };

  // Stop waiting and keep the elapsed time
  const stopWaiting = () => {
    if (timerId) clearInterval(timerId); // Stop the timer
  };


  // Stop trip and calculate total fare
  const stopTrip = () => {
    if (watchId) navigator.geolocation.clearWatch(watchId); // Stop geolocation watch
    if (timerId) clearInterval(timerId); // Clear the time interval

    // Preserve the last recorded values
    const finalWaitingTime = waitingTimeInSeconds;
    const finalWaitingFee = totalWaitingFee;
    const finalTripTime = time;
    const finalDistance = distance;
    const finalDistanceAmount = amount;

    // Set final trip details in state
    setFinalTripDetails({
      finalWaitingTime,
      finalWaitingFee,
      finalTripTime,
      finalDistance,
      finalDistanceAmount,
    });

    // Stop the trip
    setIsRunning(false);

    // Log final values
    console.log(`Final Waiting Time: ${Math.floor(finalWaitingTime / 60)} minutes ${finalWaitingTime % 60} seconds`);
    console.log(`Final Waiting Fee: ₹${finalWaitingFee.toFixed(2)}`);
    console.log(`Final Trip Time: ${Math.floor(finalTripTime / 60)} minutes ${finalTripTime % 60} seconds`);
    console.log(`Final Distance: ${finalDistance} km`);
    console.log(`Final Distance Amount: ₹${finalDistanceAmount}`);
  };

  const downloadInvoice = () => {
    const invoiceElement = document.getElementById("invoice");

    if (!invoiceElement) {
      console.error("Invoice element not found!");
      return;
    }

    setIsDownloading(true); // Set loading state

    // Add a small delay to ensure the element is fully rendered
    setTimeout(() => {
      html2canvas(invoiceElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("invoice.pdf");
        setIsDownloading(false); // Reset loading state
      });
    }, 500); // 500ms delay
  };

  const isNight = isNightTime(); // Check if it's night time
  const currentPricePerKm = isNight ? pricePerKm * 1.5 : pricePerKm;

  return (
    <div>
      <div className="trip-tracker">
        <h2>Trip Tracker</h2>

        <div className="trip-detail">
          <span className="label">Price per km:</span>
          <span className="value">₹{currentPricePerKm.toFixed(2)} ({isNight ? "Night" : "Day"})</span>
        </div>

        {/* <div className="trip-detail">
        <span className="label">Price per km:</span>
        <span className="value">₹{pricePerKm}</span>
      </div> */}


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
      {/* Display Final Trip Details */}
      {!isRunning && (
        <div className="invoice-container" id="invoice">
          <h3 className="invoice-title">Trip Invoice</h3>
          <div className="invoice-details">
            <div className="invoice-row">
              <span className="invoice-label">Final Distance:</span>
              <span className="invoice-value">
                {Math.floor(finalTripDetails.finalDistance)} km {Math.round((finalTripDetails.finalDistance % 1) * 1000)} m
              </span>
            </div>
            <div className="invoice-row">
              <span className="invoice-label">Final Distance Amount:</span>
              <span className="invoice-value">₹{finalTripDetails.finalDistanceAmount.toFixed(2)}</span>
            </div>
            <div className="invoice-row">
              <span className="invoice-label">Final Waiting Time:</span>
              <span className="invoice-value">
                {Math.floor(finalTripDetails.finalWaitingTime / 60)} min {finalTripDetails.finalWaitingTime % 60} sec
              </span>
            </div>
            <div className="invoice-row">
              <span className="invoice-label">Final Waiting Fee:</span>
              <span className="invoice-value">₹{finalTripDetails.finalWaitingFee.toFixed(2)}</span>
            </div>
            <div className="invoice-row">
              <span className="invoice-label">Final Trip Time:</span>
              <span className="invoice-value">
                {new Date(finalTripDetails.finalTripTime * 1000).toISOString().substr(11, 8)}
              </span>
            </div>
          </div>
          <div className="invoice-total">
            <span className="total-label">Total Fare:</span>
            <span className="total-value">₹{(amount + totalWaitingFee).toFixed(2)}</span>
          </div>
          <button
            className="download-button"
            onClick={downloadInvoice}
            disabled={isDownloading || isRunning} // Disable if invoice is not visible
          >
            {isDownloading ? "Generating Invoice..." : "Download Invoice"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TripTracker;
