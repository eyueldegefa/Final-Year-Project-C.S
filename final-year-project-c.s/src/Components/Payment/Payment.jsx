import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingReference, passengerDetails } = location.state || {};

  const [paymentUrl, setPaymentUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingReference || !passengerDetails) {
      alert("No booking reference or passenger details found. Please start the booking process again.");
      navigate("/");
      return;
    }

    const initiatePayment = async () => {
      try {
        const response = await axios.post("http://localhost:7676/api/payment", {
          bookingReference,
          amount: 1000, // Example amount (in ETB)
          currency: "ETB",
          email: passengerDetails.passenger_email,
          firstName: passengerDetails.passengerf_name,
          lastName: passengerDetails.passengerl_name,
          phoneNumber: passengerDetails.passenger_phone,
        });

        if (response.data.paymentUrl) {
          setPaymentUrl(response.data.paymentUrl);
        } else {
          setError("Failed to initiate payment. Please try again.");
        }
      } catch (error) {
        console.error("Payment error:", error);
        setError("Failed to initiate payment. Please try again.");
      }
    };

    initiatePayment();
  }, [bookingReference, passengerDetails, navigate]);

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);

  return (
    <div>
      <h2>Processing Payment...</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>You will be redirected to the payment page shortly.</p>
      )}
    </div>
  );
};

export default Payment;