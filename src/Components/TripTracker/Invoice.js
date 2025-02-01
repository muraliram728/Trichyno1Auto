// Invoice.js
import React, { forwardRef } from "react";

const Invoice = forwardRef(({ distance, amount, totalWaitingFee, pricePerKm, tripTime, waitingTime }, ref) => {
  return (
    <div ref={ref} style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Invoice</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Price per km</th>
            <th>Trip Time</th>
            <th>Distance</th>
            <th>Distance Amount</th>
            <th>Waiting Time</th>
            <th>Waiting Fee</th>
            <th>Total Fare</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>₹{pricePerKm}</td>
            <td>{tripTime}</td>
            <td>{distance} km</td>
            <td>₹{amount}</td>
            <td>{waitingTime}</td>
            <td>₹{totalWaitingFee}</td>
            <td>₹{(amount + totalWaitingFee).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default Invoice;