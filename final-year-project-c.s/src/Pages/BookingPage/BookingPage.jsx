import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Pages/Config/firebase"; // Adjust the path to your Firebase config

const BookingPage = () => {
  const { state } = useLocation();
  const train = state?.train;

  const [passengerName, setPassengerName] = useState("");
  const [passengerAge, setPassengerAge] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    // Validation
    if (!passengerName) {
      alert("Please enter your name.");
      return;
    }
    if (!passengerAge) {
      alert("Please enter your age.");
      return;
    }
    if (!passengerPhone) {
      alert("Please enter your phone number.");
      return;
    }

    try {
      const bookingRef = collection(db, "bookings");
      await addDoc(bookingRef, {
        trainId: train.id,
        trainName: train.name,
        passengerName,
        passengerAge: parseInt(passengerAge, 10),
        passengerPhone,
        passengerEmail,
        bookedAt: new Date(),
      });
      alert("Booking successful!");
      // Reset form fields
      setPassengerName("");
      setPassengerAge("");
      setPassengerPhone("");
      setPassengerEmail("");
    } catch (error) {
      console.error("Error booking:", error);
      alert("Failed to book the train. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book Train: {train.name}</h1>
      <h2>
        From {train.source} To {train.destination}
      </h2>
      <p>Departure: {train.departure}</p>
      <p>Arrival: {train.arrival}</p>
      <p>Price: ${train.price}</p>

      <form onSubmit={handleBooking}>
        <div>
          <label>Passenger Name:</label>
          <input
            type="text"
            value={passengerName}
            placeholder="Enter your full name"
            onChange={(e) => setPassengerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Passenger Age:</label>
          <input
            type="number"
            value={passengerAge}
            placeholder="Enter your age"
            onChange={(e) => setPassengerAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={passengerPhone}
            placeholder="Enter your phone number"
            onChange={(e) => setPassengerPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Passenger Email:</label>
          <input
            type="email"
            value={passengerEmail}
            placeholder="Enter your email"
            onChange={(e) => setPassengerEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;
