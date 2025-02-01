import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = location.state || {};

  if (!bookingDetails) {
    return <div>No booking details found.</div>;
  }

  const { bookingReference, passengerDetails, trainDetails, selectedSeats } = bookingDetails;

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px", maxWidth: "400px", margin: "auto" }}>
      <h2>Booking Confirmed!</h2>
      <h3>Booking Reference: {bookingReference}</h3>
      <div>
        <h4>Passenger Details:</h4>
        <p><strong>Name:</strong> {passengerDetails.passenger_name}</p>
        <p><strong>Age:</strong> {passengerDetails.passenger_age}</p>
        <p><strong>Phone:</strong> {passengerDetails.passenger_phone}</p>
        <p><strong>Email:</strong> {passengerDetails.passenger_email}</p>
      </div>
      <div>
        <h4>Train Details:</h4>
        <p><strong>Train ID:</strong> {trainDetails.train_id}</p>
      </div>
      <div>
        <h4>Selected Seats:</h4>
        <ul>
          {selectedSeats.map((seatId, index) => (
            <li key={index}>Seat {seatId}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => window.print()}>Print Ticket</button>
      <button onClick={() => navigate("/payment", { state: { bookingReference } })}>
                      Proceed to Payment
      </button>
    </div>
  );
};

export default Success;