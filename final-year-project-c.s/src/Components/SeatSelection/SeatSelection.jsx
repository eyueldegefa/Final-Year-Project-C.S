// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useLocation, useParams } from "react-router-dom";

// const SeatSelection = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { trainId: paramTrainId } = useParams();
//   const trainId = location.state?.trainId || paramTrainId;

//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [amount, setAmount] = useState("");
//   const [seats, setSeats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [details, setDetails] = useState({
//     passengerf_name: "",
//     passengerl_name: "",
//     passsnger_dateofbirth: "",
//     passenger_phone: "",
//     passenger_email: "",
//   });

//   // Fetch seat data from backend
//   useEffect(() => {
//     if (!trainId) {
//       console.error("🚨 Train ID is missing!");
//       setError("Train ID is missing.");
//       setLoading(false);
//       return;
//     }

//     const fetchSeats = async () => {
//       try {
//         console.log("Fetching seats for Train ID:", trainId);
//         const response = await axios.get(`http://localhost:7676/seats/${trainId}`);
//         console.log("Fetched seats:", response.data);
//         setSeats(response.data);
//       } catch (err) {
//         console.error("Error fetching seats:", err);
//         setError("Failed to fetch seats.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeats();
//   }, [trainId]);

//   // Handle seat selection
//   const handleSeatClick = (seatId) => {
//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
//     } else {
//       setSelectedSeats([...selectedSeats, seatId]);
//     }
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDetails((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Confirm booking
//   const confirmBooking = async () => {
//     console.log("Selected Seats:", selectedSeats);

//     if (
//       !details.passengerf_name ||
//       !details.passengerl_name ||
//       !details.passsnger_dateofbirth ||
//       !details.passenger_phone ||
//       !details.passenger_email
//     ) {
//       alert("Please fill in all the fields.");
//       return;
//     }

//     if (selectedSeats.length === 0) {
//       alert("Please select at least one seat.");
//       return;
//     }

//     if (selectedSeats.includes(404)) {
//       alert("Invalid seat selection. Please try again.");
//       return;
//     }

//     const requestBody = {
//       selectedSeats,
//       amount: parseFloat(amount), // Ensure it's a number
//       ...details,
//     };

//     console.log("Final Request Body:", requestBody);

//     try {
//       const response = await axios.post("http://localhost:7676/api/confirm-booking", requestBody);
//       console.log("Booking Response:", response.data);

//       navigate("/verify-booking", { state: { bookingReference: response.data.bookingReference } });
//     } catch (error) {
//       console.error("Error confirming booking:", error.response ? error.response.data : error.message);
//       alert("Failed to confirm booking. Please try again.");
//     }
//   };

//   if (loading) return <p>Loading seats...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       <h1>Select Seats</h1>
//       {seats.length === 0 ? (
//         <p>No seats available.</p>
//       ) : (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//           {seats.map((seat) => (
//             <div
//               key={seat.seat_id}
//               onClick={() => seat.status === "available" && handleSeatClick(seat.seat_id)}
//               style={{
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 backgroundColor: selectedSeats.includes(seat.seat_id)
//                   ? "#007bff"
//                   : seat.status === "booked"
//                   ? "#ff0000"
//                   : "#fff",
//                 color: selectedSeats.includes(seat.seat_id) ? "#fff" : "#000",
//                 cursor: seat.status === "available" ? "pointer" : "not-allowed",
//               }}
//             >
//               {seat.seat_id}
//             </div>
//           ))}
//         </div>
//       )}

//       <input
//         type="text"
//         name="passengerf_name"
//         placeholder="First Name"
//         value={details.passengerf_name}
//         onChange={handleInputChange}
//       />
//       <input
//         type="text"
//         name="passengerl_name"
//         placeholder="Last Name"
//         value={details.passengerl_name}
//         onChange={handleInputChange}
//       />
//       <input
//         type="date"
//         name="passsnger_dateofbirth"
//         placeholder="Date of Birth"
//         value={details.passsnger_dateofbirth}
//         onChange={handleInputChange}
//       />
//       <input
//         type="text"
//         name="passenger_phone"
//         placeholder="Phone Number"
//         value={details.passenger_phone}
//         onChange={handleInputChange}
//       />
//       <input
//         type="email"
//         name="passenger_email"
//         placeholder="Email"
//         value={details.passenger_email}
//         onChange={handleInputChange}
//       />

//       <input
//         type="number"
//         placeholder="Enter Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}
//       />

//       <button
//         type="button"
//         onClick={confirmBooking}
//         style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}
//       >
//         Confirm Booking
//       </button>
//     </div>
//   );
// };

// export default SeatSelection;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Grid2 from '@mui/material/Grid2';
import { Button } from "@mui/material";

const SeatSelection = () => {
    const location = useLocation();
    const { trainId: paramTrainId } = useParams();
    const trainId = location.state?.trainId || paramTrainId;
    const navigate = useNavigate();


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
            navigate("/verify-booking", { state: { bookingDetails: data } });
            console.log({state: {bookingDetails: data}});
            
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
  
  export default SeatSelection;