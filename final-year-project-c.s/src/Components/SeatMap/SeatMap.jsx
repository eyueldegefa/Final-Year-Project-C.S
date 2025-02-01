// import React, { useEffect, useState } from 'react';
// import Grid2 from '@mui/material/Unstable_Grid22';
// import { Button } from '@mui/material';

// const SeatMap = ({ trainId }) => {
//   const [seats, setSeats] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:7676/seats/${trainId}`)
//       .then(response => response.json())
//       .then(data => setSeats(data));
//   }, [trainId]);

//   const handleSeatClick = (seatId) => {
//     const updatedSeats = seats.map(seat =>
//       seat.id === seatId ? { ...seat, status: seat.status === 'selected' ? 'available' : 'selected' } : seat
//     );
//     setSeats(updatedSeats);

//     // Update seat status in the backend
//     fetch('http://localhost:7676/seats/update', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ seatId, status: 'selected' })
//     });
//   };

//   return (
//     <Grid2 container spacing={2}>
//       {seats.map(seat => (
//         <Grid2 item key={seat.id}>
//           <Button
//             variant="contained"
//             color={seat.status === 'selected' ? 'secondary' : 'primary'}
//             onClick={() => handleSeatClick(seat.id)}
//           >
//             {seat.seat_number}
//           </Button>
//         </Grid2>
//       ))}
//     </Grid2>
//   );
// };

// export default SeatMap;

// ----------------------------------------------------------------------------------
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Grid2 from '@mui/material/Grid2';
import { Button } from "@mui/material";

const SeatMap = () => {
    const { trainId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { passengerDetails, trainDetails } = location.state;
  
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
              selectedSeats, // Ensure this is sent to the backend
            }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            alert("Booking confirmed! Check your email for details.");
            navigate("/success", { state: { bookingDetails: data } });
          } else {
            alert(data.error || "Failed to confirm booking.");
          }
        } catch (error) {
          console.error("Error confirming booking:", error);
          alert("An error occurred while confirming your booking.");
        }
      };
  
    return (
      <div>
        <h1>Seat Selection for Train ID: {trainId}</h1>
        <Grid2 container spacing={2}>
          {seats.length > 0 ? (
            seats.map(seat => (
              <Grid2 item key={seat.seat_id}>
                <Button
                  variant="contained"
                  color={
                    selectedSeats.includes(seat.seat_id)
                      ? "secondary"
                      : seat.status === 'reserved'
                      ? "error"
                      : "primary"
                  }
                  onClick={() => handleSeatClick(seat.seat_id)}
                  disabled={seat.status === 'reserved'}
                >
                  {seat.seat_number}
                </Button>
              </Grid2>
            ))
          ) : (
            <p>No seats available for this train.</p>
          )}
        </Grid2>
        <button type="button" onClick={confirmBooking}>
          Confirm Booking
        </button>
      </div>
    );
  };
  
  export default SeatMap;