import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ManageTicket.css";
import Layout from "../../Components/Layout/Layout";

const ManageTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passengerData = location.state?.passengerData;
  const [date, setDate] = useState(passengerData.booked_at || ""); // Fix: Initialize with correct date
  const [showDateInput, setShowDateInput] = useState(false);

  console.log("Received Passenger Data:", passengerData); // ✅ Debug log

  if (!passengerData) {
    return <h2>No booking details found. Please try again.</h2>;
  }

  const handleChangeDate = async () => {
    if (!date) {
      alert("Please select a new date before proceeding.");
      return;
    }

    const isConfirmed = window.confirm(`Are you sure you want to change the date from ${new Date(passengerData.booked_at).toLocaleDateString()} to ${date}? \n Changing date has a 500 ETB additional fee.`);
    if (!isConfirmed) return; // If user cancels, do nothing

    try {
      const response = await axios.put("http://localhost:7676/api/bookings/update-date", {
        booking_reference: passengerData.booking_reference,
        passengerl_name: passengerData.passengerl_name,
        new_date: date, // Fix: Use correct date state
      });

      if (response.data.success) {
        alert("Date updated successfully!");
        setShowDateInput(false); // Hide input field after update
        navigate("/"); // Redirect to homepage after updating date
      }
    } catch (error) {
      console.error("Error updating date:", error);
      alert("Error updating the date.");
    }
  };

  const handleCancelTicket = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this ticket? \n500 ETB will be deducted as a cancellation fee."
    );
    if (!isConfirmed) return; // If user cancels, do nothing

    try {
      const response = await axios.post("http://localhost:7676/api/bookings/cancel-ticket", {
        booking_reference: passengerData.booking_reference,
        passengerf_name: passengerData.passengerf_name,
        passengerl_name: passengerData.passengerl_name,
        canceled_date: new Date().toISOString().split("T")[0], // Format YYYY-MM-DD
      });

      if (response.data.success) {
        alert("Ticket canceled successfully! \n We are processing your refund.");
        navigate("/"); // Redirect to homepage after canceling
      }
    } catch (error) {
      console.error("Error canceling ticket:", error);
      alert("Error canceling the ticket.");
    }
  };

  return (
    <Layout>
    <div className="manage-ticket-container">
      <h1 className="text-center fw-bold">Manage Ticket</h1>
      <p className="text-center">You can change your going date or cancel you ticker!</p>
      <p><strong>Booking Reference:</strong> {passengerData.booking_reference}</p>
      <p>
        <strong>Passenger Name:</strong> {passengerData.passengerf_name} {passengerData.passengerl_name}
      </p>
      <p><strong>Date:</strong> {new Date(passengerData.booked_at).toLocaleDateString()}</p> 
      <p><strong>Source:</strong>{passengerData.source}</p>

      {showDateInput ? (
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={handleChangeDate}>Confirm Date Change</button>
        </div>
      ) : (
        <button onClick={() => setShowDateInput(true)}>Change Date</button>
      )}

      <button onClick={handleCancelTicket}>Cancel Ticket</button>
    </div>
    </Layout>
  );
};

export default ManageTicket;
