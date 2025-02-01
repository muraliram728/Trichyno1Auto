// InvoicePage.js
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Invoice from "./Invoice";

const InvoicePage = ({ distance, amount, totalWaitingFee, pricePerKm, tripTime, waitingTime }) => {
  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Invoice",
  });

  return (
    <React.Fragment>
      {/* Render the Invoice component outside the visible viewport */}
      <div style={{ position: "absolute", left: "-10000px" }}>
        <Invoice
          ref={invoiceRef}
          distance={distance}
          amount={amount}
          totalWaitingFee={totalWaitingFee}
          pricePerKm={pricePerKm}
          tripTime={tripTime}
          waitingTime={waitingTime}
        />
      </div>

      <button onClick={handlePrint}>Download Invoice</button>
    </React.Fragment>
  );
};

export default InvoicePage;