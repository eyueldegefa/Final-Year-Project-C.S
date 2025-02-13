import React from "react";
import { useLocation } from "react-router-dom";

const PaymentFailed = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookingReference = searchParams.get("bookingReference");

  return (
    <div className="payment-failed-container">
      <h1>Payment Failed</h1>
      <p>Unfortunately, your payment was not successful. Please try again.</p>
      <div className="booking-details">
        <h2>Booking Details</h2>
        <p><strong>Booking Reference:</strong> {bookingReference}</p>
      </div>
      <button onClick={() => window.location.href = "/payment"}>Retry Payment</button>
    </div>
  );
};

export default PaymentFailed;