import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const { bookingReference } = location.state || {};

  const [paymentUrl, setPaymentUrl] = useState("");

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const response = await fetch("http://localhost:7676/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingReference,
            amount: 1000, // Example amount
            currency: "ETB",
            email: "test@example.com",
          }),
        });

        const data = await response.json();
        setPaymentUrl(data.paymentUrl);
      } catch (error) {
        console.error("Payment error:", error);
      }
    };

    initiatePayment();
  }, [bookingReference]);

  if (paymentUrl) {
    window.location.href = paymentUrl; // Redirect to Chapa payment page
  }

  return (
    <div>
      <h2>Processing Payment...</h2>
    </div>
  );
};

export default Payment;