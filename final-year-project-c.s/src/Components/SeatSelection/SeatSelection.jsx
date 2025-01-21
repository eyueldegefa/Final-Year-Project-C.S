// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./SeatSelection.css"; // Ensure CSS is included for styling

// function SeatSelection() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { train, personalDetails } = location.state || {};
//   const [seats, setSeats] = useState([]);
//   const [selectedSeat, setSelectedSeat] = useState(null);
//   const [error, setError] = useState("");

//   // Fetch seat data when the component loads
//   useEffect(() => {
//     if (train && train.id) {
//       console.log("Fetching seats for train ID:", train.id);

//       axios.get(`http://localhost:7676/api/train-seats/${train.id}`)
//       .then((response) => {
//         setSeats(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching seats:", error.response?.data || error.message);
//       });
    
//     }
//   }, [train]);
  
  
//   // Handle seat selection
//   const handleSeatSelect = (seatId) => {
//     const seat = seats.find((seat) => seat.seat_id === seatId);
//     if (!seat.booked) {
//       setSelectedSeat(seatId);
//       setError(""); // Clear any previous errors
//     }
//   };

//   // Handle submission to the next step
//   const handleSubmit = () => {
//     if (!selectedSeat) {
//       setError("Please select a seat before proceeding.");
//       return;
//     }

//     // Navigate to the confirmation or payment page with all data
//     navigate("/confirm-booking", {
//       state: { train, personalDetails, selectedSeat },
//     });
//   };

//   return (
//     <div>
//       <h1>Seat Selection</h1>

//       {/* Train Information */}
//       {train && (
//         <div>
//           <p>
//             <strong>Train:</strong> {train.name}
//           </p>
//           <p>
//             <strong>From:</strong> {train.source}
//           </p>
//           <p>
//             <strong>To:</strong> {train.destination}
//           </p>
//         </div>
//       )}

//       {/* Seat Selection Section */}
//       <div>
//         <h3>Select Your Seat</h3>
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {seats.length > 0 ? (
//         <div className="seat-grid">
//           {seats.map((seat) => (
//             <button
//               key={seat.seat_id}
//               className={`seat ${
//                 seat.booked ? "booked" : selectedSeat === seat.seat_id ? "selected" : ""
//               }`}
//               onClick={() => handleSeatSelect(seat.seat_id)}
//               disabled={seat.booked}
//             >
//               {seat.seat_number}
//             </button>
//           ))}
//         </div>
//           ) : (
//           <p>No seats available.</p>
//           )}

//         <button onClick={handleSubmit} disabled={!selectedSeat}>
//           Confirm Seat and Proceed
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SeatSelection;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const SeatSelection = () => {
//   const [seats, setSeats] = useState([]);
//   const [selectedSeat, setSelectedSeat] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { trainId } = useParams(); // Get train ID from the route parameters

//   // Fetch seat data when the component mounts
//   useEffect(() => {
//     const fetchSeats = async () => {
//       try {
//         const response = await fetch(`http://localhost:7676/api/train-seats/${trainId}`);
//         const data = await response.json();
//         if (response.ok) {
//           setSeats(data);
//         } else {
//           setError(data.error || "Failed to fetch seat data");
//         }
//       } catch (err) {
//         setError("Error connecting to the server");
//       }
//     };

//     fetchSeats();
//   }, [trainId]);

//   // Handle seat selection
//   const handleSeatSelection = (seatNumber) => {
//     if (seats.find((seat) => seat.seat_number === seatNumber && seat.isBooked)) {
//       alert("This seat is already booked. Please select a different one.");
//     } else {
//       setSelectedSeat(seatNumber);
//     }
//   };

//   // Proceed to booking with the selected seat
//   const handleProceed = () => {
//     if (!selectedSeat) {
//       alert("Please select a seat before proceeding.");
//       return;
//     }

//     navigate("/booking-confirmation", {
//       state: { trainId, selectedSeat },
//     });
//   };

//   return (
//     <div className="seat-selection">
//       <h1>Select Your Seat</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {!error && seats.length === 0 && <p>Loading seats...</p>}

//       <div className="seat-container">
//         {seats.map((seat) => (
//           <div
//             key={seat.seat_number}
//             className={`seat ${seat.isBooked ? "booked" : ""} ${
//               selectedSeat === seat.seat_number ? "selected" : ""
//             }`}
//             onClick={() => handleSeatSelection(seat.seat_number)}
//             style={{
//               display: "inline-block",
//               padding: "10px",
//               margin: "5px",
//               border: "1px solid",
//               backgroundColor: seat.isBooked
//                 ? "red"
//                 : selectedSeat === seat.seat_number
//                 ? "green"
//                 : "white",
//               color: seat.isBooked ? "white" : "black",
//               cursor: seat.isBooked ? "not-allowed" : "pointer",
//             }}
//           >
//             {seat.seat_number}
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={handleProceed}
//         disabled={!selectedSeat}
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           backgroundColor: selectedSeat ? "blue" : "gray",
//           color: "white",
//           border: "none",
//           cursor: selectedSeat ? "pointer" : "not-allowed",
//         }}
//       >
//         Proceed
//       </button>
//     </div>
//   );
// };

// export default SeatSelection;


// SeatSelection.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedTrain, passengerDetails } = location.state || {};
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState("");

  useEffect(() => {
    console.log("Received selectedTrain:", selectedTrain);
    console.log("Received passengerDetails:", passengerDetails);
  
    if (!selectedTrain) {
      navigate("/search-trains"); // Redirect if no train is selected
      return;
    }
  
    const fetchSeats = async () => {
      try {
        const response = await fetch(
          `http://localhost:7676/api/train-seats/${selectedTrain.id}`
        );
        const data = await response.json();
        if (response.ok) {
          console.log("Fetched seats:", data);
          setSeats(data);
        } else {
          console.error("Failed to fetch seats:", data.error);
        }
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };
  
    fetchSeats();
  }, [selectedTrain, navigate]);
  

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const handleBooking = async () => {
    if (!selectedSeat) {
      alert("Please select a seat.");
      return;
    }

    try {
      const response = await fetch("http://localhost:7676/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          train_id: selectedTrain.id,
          passenger_name: passengerDetails.passenger_name,
          passenger_age: passengerDetails.passenger_age,
          passenger_phone: passengerDetails.passenger_phone,
          passenger_email: passengerDetails.passenger_email,
          selected_seat: selectedSeat,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Seat booked successfully!");
        navigate("/confirmation", { state: { bookingDetails: data } });
      } else {
        console.error("Failed to book seat:", data.error);
        alert(data.error || "Booking failed. Try again.");
      }
    } catch (error) {
      console.error("Error booking seat:", error);
      alert("An error occurred while booking the seat. Try again.");
    }
  };

  return (
    <div className="seat-selection-container">
      <h1>Seat Selection</h1>
      <p>Train Name: {selectedTrain.name}</p>
      <p>Passenger Name: {passengerDetails.passengerName}</p>
      <div>
        {seats.length > 0 ? (
          <div className="seat-grid">
            {seats.map((seat) => (
              <button
                key={seat.id}
                className={`seat ${seat.isBooked ? "booked" : ""} ${
                  selectedSeat === seat.seat_number ? "selected" : ""
                }`}
                onClick={() => handleSeatSelect(seat.seat_number)}
                disabled={seat.isBooked}
              >
                {seat.seat_number}
              </button>
            ))}
          </div>
        ) : (
          <p>No seats available for this train.</p>
        )}
      </div>
      <button onClick={handleBooking} disabled={!selectedSeat}>
        Confirm Booking
      </button>
    </div>
  );
};

export default SeatSelection;
