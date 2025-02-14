import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import RectangleRoundedIcon from '@mui/icons-material/RectangleRounded';
import "./SeatSelection.css";

const SeatSelection = () => {
    const location = useLocation();
    const { trainId: paramTrainId } = useParams();
    const trainId = location.state?.trainId || paramTrainId;
    const navigate = useNavigate();

    const { passengerDetails } = location.state;
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
  
    useEffect(() => {
      fetch(`http://localhost:7676/seats/${trainId}`)
        .then(response => response.json())
        .then(data => {
          console.log("Fetched seats:", data);
          setSeats(data);
        })
        .catch(error => console.error("Error fetching seats:", error));
    }, [trainId]);
  
    const handleSeatClick = (seatId) => {
      const seat = seats.find(seat => seat.seat_id === seatId);
      if (seat.status === 'reserved') {
        alert("This seat is already reserved. Please select another seat.");
        return;
      }
  
      if (selectedSeats.includes(seatId)) {
        setSelectedSeats(selectedSeats.filter(id => id !== seatId));
      } else {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    };
  
    const confirmBooking = async () => {
      try {
        const response = await fetch("http://localhost:7676/api/confirm-booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            train_id: trainId,
            ...passengerDetails,
            selectedSeats,
          }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          alert("Booking confirmed! Check your email for details.");
          navigate("/verify-booking", {
            state: {
              bookingDetails: {
                ...data,
                source: location.state?.source, // Pass source
                destination: location.state?.destination, // Pass destination
                price: location.state?.price, // Pass price
                passengerDetails, // Pass passenger details
                selectedSeats, // Pass selected seats
              },
            },
          });
        } else {
          alert(data.error || "Failed to confirm booking.");
        }
      } catch (error) {
        console.error("Error confirming booking:", error);
        alert("An error occurred while confirming your booking.");
      }
    };
  
    return (
      <div className="seat-selection-container">
        <h1 className="fw-bold">Select your seat</h1>
        <div className="d-flex py-3">
          <p><RectangleRoundedIcon className="text-secondary"/>Selected</p>
          <p><RectangleRoundedIcon className="text-info"/>Available</p>
          <p><RectangleRoundedIcon className="text-danger"/>Booked</p>
        </div>
        <div className="seat-grid">
          {seats.length > 0 ? (
            <div className="seat-layout">
              <div className="seat-section">
                {seats.filter((_, index) => index % 8 < 4).map(seat => (
                  <Button
                    key={seat.seat_id}
                    className={`seat-button ${
                      selectedSeats.includes(seat.seat_id)
                        ? "secondary"
                        : seat.status === 'reserved'
                        ? "error"
                        : "primary"
                    }`}
                    onClick={() => handleSeatClick(seat.seat_id)}
                    disabled={seat.status === 'reserved'}
                  >
                    {seat.seat_number}
                  </Button>
                ))}
              </div>
              <div className="seat-walkway"></div>
              <div className="seat-section">
                {seats.filter((_, index) => index % 8 >= 4).map(seat => (
                  <Button
                    key={seat.seat_id}
                    className={`seat-button ${
                      selectedSeats.includes(seat.seat_id)
                        ? "secondary"
                        : seat.status === 'reserved'
                        ? "error"
                        : "primary"
                    }`}
                    onClick={() => handleSeatClick(seat.seat_id)}
                    disabled={seat.status === 'reserved'}
                  >
                    {seat.seat_number}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <p>No seats available for this train.</p>
          )}
        </div>
        <button className="confirm-button" type="button" onClick={confirmBooking}>
          Confirm Booking
        </button>
      </div>
    );
  };
  
  export default SeatSelection;
