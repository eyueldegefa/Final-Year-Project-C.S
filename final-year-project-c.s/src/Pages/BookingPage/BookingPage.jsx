import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Adjust the path to your Firebase config

const BookingPage = () => {
  const { state } = useLocation();
  const train = state?.train;

  const [passengerName, setPassengerName] = useState("");
  const [passengerAge, setPassengerAge] = useState("");

  const handleBooking = async () => {
    if (!passengerName || !passengerAge) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const bookingRef = collection(db, "bookings");
      await addDoc(bookingRef, {
        trainId: train.id,
        trainName: train.name,
        passengerName,
        passengerAge,
        bookedAt: new Date(),
      });
      alert("Booking successful!");
    } catch (error) {
      console.error("Error booking:", error);
      alert("Failed to book the train. Please try again.");
    }
  };

  return (
    <div>
      <h1>Book Train: {train.name}</h1>
      <p>Departure: {train.departure}</p>
      <p>Arrival: {train.arrival}</p>
      <p>Price: ${train.price}</p>

      <form>
        <div>
          <label>Passenger Name:</label>
          <input
            type="text"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Passenger Age:</label>
          <input
            type="number"
            value={passengerAge}
            onChange={(e) => setPassengerAge(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleBooking}>
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
