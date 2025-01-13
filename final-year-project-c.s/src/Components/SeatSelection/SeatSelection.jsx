import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SeatSelection.css"; // Ensure CSS is included for styling

function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, personalDetails } = location.state || {};
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [error, setError] = useState("");

  // Fetch seat data when the component loads
  useEffect(() => {
    if (train && train.id) {
      axios
        .get(`http://localhost:7676/api/train-seats/${train.id}`) // Backend endpoint to fetch seat info
        .then((response) => setSeats(response.data))
        .catch((err) => setError("Failed to load seat data."));
    }
  }, [train]);

  const handleSeatSelect = (seatId) => {
    if (!seats.find((seat) => seat.id === seatId).isBooked) {
      setSelectedSeat(seatId);
      setError(""); // Clear any previous errors
    }
  };

  const handleSubmit = () => {
    if (!selectedSeat) {
      setError("Please select a seat before proceeding.");
      return;
    }

    // Navigate to the confirmation or payment page with all data
    navigate("/confirm-booking", { state: { train, personalDetails, selectedSeat } });
  };

  return (
    <div>
      <h1>Seat Selection</h1>
      {train && (
        <div>
          <p><strong>Train:</strong> {train.name}</p>
          <p><strong>From:</strong> {train.source}</p>
          <p><strong>To:</strong> {train.destination}</p>
        </div>
      )}

      <div>
        <h3>Select Your Seat</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="seat-grid">
          {seats.map((seat) => (
            <button
              key={seat.seat_id}
              className={`seat ${
                seat.booked ? "booked" : selectedSeat === seat.seat_id ? "selected" : ""
              }`}
              onClick={() => handleSeatSelect(seat.seat_id)}
              disabled={seat.booked}
            >
              {seat.seat_number}
            </button>
          ))}
        </div>

        <button onClick={handleSubmit} disabled={!selectedSeat}>
          Confirm Seat and Proceed
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;
