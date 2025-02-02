import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SeatMap = ({ trainId, passengerDetails, trainDetails }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  // Mock seat data (replace with actual data from your backend)
  const seats = [
    { seat_id: 401, status: "available" },
    { seat_id: 402, status: "available" },
    { seat_id: 403, status: "available" },
    { seat_id: 404, status: "available" },
  ];

  const handleSeatClick = (seatId) => {
    console.log("Seat clicked:", seatId);
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const confirmBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
  
    // Ensure all required fields are included
    const bookingData = {
      train_id: trainId, // Replace with the actual train ID
      ...passengerDetails, // Include all passenger details
      selectedSeats,
      amount: 1000, // Example amount
    };
  
    console.log("Request body:", bookingData); // Debug: Log the request body
  
    try {
      const response = await axios.post("http://localhost:7676/api/confirm-booking", bookingData);
      console.log("Booking confirmed:", response.data);
      // Proceed to payment
      navigate("/payment", { state: { bookingReference: response.data.bookingReference, passengerDetails } });
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Failed to confirm booking. Please check all fields and try again.");
    }
  };

  return (
    <div>
      <h1>Select Seats for Train ID: {trainId}</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {seats.map((seat) => (
          <div
            key={seat.seat_id}
            onClick={() => handleSeatClick(seat.seat_id)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              backgroundColor: selectedSeats.includes(seat.seat_id) ? "#007bff" : seat.status === "available" ? "#fff" : "#ccc",
              color: selectedSeats.includes(seat.seat_id) ? "#fff" : "#000",
              cursor: seat.status === "available" ? "pointer" : "not-allowed",
            }}
          >
            Seat {seat.seat_id}
          </div>
        ))}
      </div>
      <button onClick={confirmBooking} style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Confirm Booking
      </button>
    </div>
  );
};

export default SeatMap;