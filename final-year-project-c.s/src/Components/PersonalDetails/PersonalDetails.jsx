import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { trainId: paramTrainId } = useParams(); // Get trainId from URL if available
  const trainId = location.state?.trainId || paramTrainId; // Prefer state over params

  if (!trainId) {
    console.error("🚨 Train ID is missing in PersonalDetails");
  }

  const [details, setDetails] = useState({
    passengerf_name: "",
    passengerl_name: "",
    passenger_dateofbirth: "",
    passenger_phone: "",
    passenger_email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const proceedToSeatSelection = () => {
    if (!details.passengerf_name || !details.passengerl_name || !details.passenger_phone || !details.passenger_email) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    if (!trainId) {
      alert("🚨 Train ID is missing. Please select a train first.");
      return;
    }

    navigate("/seat-selection", {
      state: { passengerDetails: details, trainId }, // Dynamically pass trainId
    });
  };

  return (
    <div>
      <h1>Train ID: {trainId || "Not Available"}</h1> {/* Show trainId for debugging */}
      <h1>Enter Personal Details</h1>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" name="passengerf_name" placeholder="First Name" value={details.passengerf_name} onChange={handleChange} required />
        <input type="text" name="passengerl_name" placeholder="Last Name" value={details.passengerl_name} onChange={handleChange} required />
        <input type="date" name="passenger_dateofbirth" placeholder="Date of Birth" value={details.passenger_dateofbirth} onChange={handleChange} required />
        <input type="text" name="passenger_phone" placeholder="Phone" value={details.passenger_phone} onChange={handleChange} required />
        <input type="email" name="passenger_email" placeholder="Email" value={details.passenger_email} onChange={handleChange} required />
        <button type="button" onClick={proceedToSeatSelection}>Proceed to Seat Selection</button>
      </form>
    </div>
  );
};

export default PersonalDetails;
