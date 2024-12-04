// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "../../Pages/Config/firebase"; // Adjust the path to your Firebase config

// const BookingPage = () => {
//   const { state } = useLocation();
//   const train = state?.train;

//   const [passengerName, setPassengerName] = useState("");
//   const [passengerAge, setPassengerAge] = useState("");
//   const [passengerPhone, setPassengerPhone] = useState("");
//   const [passengerEmail, setPassengerEmail] = useState("");
//   const [passengerSeat, setPassengerSeat] = useState("");

//   const handleBooking = async () => {
//     if (!passengerName || !passengerAge || !passengerPhone) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     try {
//       const bookingRef = collection(db, "bookings");
//       await addDoc(bookingRef, {
//         trainId: train.id,
//         trainName: train.name,
//         passengerName,
//         passengerAge,
//         passengerPhone,
//         passengerEmail,
//         passengerSeat,
//         bookedAt: new Date(),
//       });
//       alert("Booking successful!");
//     } catch (error) {
//       console.error("Error booking:", error);
//       alert("Failed to book the train. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h1>Book Train: {train?.name}</h1>
//       <h2>From {train?.source} To {train?.destination}</h2>
//       <p>Departure: {train?.departure}</p>
//       <p>Arrival: {train?.arrival}</p>
//       <p>Price: ${train?.price}</p>

//       <form>
//         <div>
//           <label>Passenger Name:</label>
//           <input
//             type="text"
//             value={passengerName}
//             onChange={(e) => setPassengerName(e.target.value)}
//             placeholder="Enter your full name"
//             required
//           />
//         </div>
//         <div>
//           <label>Passenger Age:</label>
//           <input
//             type="number"
//             value={passengerAge}
//             onChange={(e) => setPassengerAge(e.target.value)}
//             placeholder="Enter your age"
//             required
//           />
//         </div>
//         <div>
//           <label>Phone:</label>
//           <input
//             type="tel"
//             value={passengerPhone}
//             onChange={(e) => setPassengerPhone(e.target.value)}
//             placeholder="Enter your phone number"
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={passengerEmail}
//             onChange={(e) => setPassengerEmail(e.target.value)}
//             placeholder="Enter your email address"
//             required
//           />
//         </div>
//         <div>
//           <label>Seat:</label>
//           <input
//             type="number"
//             value={passengerSeat}
//             onChange={(e) => setPassengerSeat(e.target.value)}
//             placeholder=""
//             required
//           />
//         </div>
//         <button type="button" onClick={handleBooking}>
//           Confirm Booking
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookingPage;


import { useState, useEffect } from "react";
import axios from "axios";

const BookingPage = () => {
  const [trainDetails, setTrainDetails] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5656/api/trains") // Adjust endpoint as needed
      .then((response) => {
        setTrainDetails(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Train Details</h1>
      {trainDetails ? (
        <ul>
          {trainDetails.map((train) => (
            <li key={train.train_id}>
              {train.name} - {train.source} to {train.destination}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookingPage;


