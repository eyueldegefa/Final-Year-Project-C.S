import React from "react";
import { useLocation } from "react-router-dom";
import "./Success.css";

const Success = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookingReference = searchParams.get("bookingReference");

  console.log("Query Parameters:", location.search); // Log the query string
  console.log("Booking Reference:", bookingReference); // Log the extracted booking reference

  return (
    <div className="success-container">
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your booking has been confirmed.</p>
      <div className="booking-details">
        <h2>Booking Details</h2>
        <p><strong>Booking Reference:</strong> {bookingReference}</p>
      </div>
      <button onClick={() => window.print()}>Print Receipt</button>
    </div>
  );
};

export default Success;