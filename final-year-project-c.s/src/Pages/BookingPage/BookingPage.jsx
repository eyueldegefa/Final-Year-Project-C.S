import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Pages/Config/firebase"; // Adjust the path to your Firebase config

const BookingPage = () => {
  const { state } = useLocation();
  const train = state?.train;

  const [passengerName, setPassengerName] = useState("");
  const [passengerAge, setPassengerAge] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");

  const handleBooking = async () => {
    if (!passengerName || !passengerAge || !passengerPhone) {
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
        passengerPhone,
        passengerEmail,
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
      <h1>Book Train: {train?.name}</h1>
      <h2>From {train?.source} To {train?.destination}</h2>
      <p>Departure: {train?.departure}</p>
      <p>Arrival: {train?.arrival}</p>
      <p>Price: ${train?.price}</p>

      <form>
        <div>
          <label>Passenger Name:</label>
          <input
            type="text"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label>Passenger Age:</label>
          <input
            type="number"
            value={passengerAge}
            onChange={(e) => setPassengerAge(e.target.value)}
            placeholder="Enter your age"
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={passengerPhone}
            onChange={(e) => setPassengerPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={passengerEmail}
            onChange={(e) => setPassengerEmail(e.target.value)}
            placeholder="Enter your email address"
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
