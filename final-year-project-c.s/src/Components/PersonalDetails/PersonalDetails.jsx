import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const PersonalDetails = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const trainDetails = location.state?.train;

  const [details, setDetails] = useState({
    passengerf_name: "",
    passengerl_name: "",
    passenger_dateofbirth: "",
    passenger_phone: "",
    passenger_email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validate phone number
    if (name === "passenger_phone" && !/^\d+$/.test(value)) {
      alert("Phone number must contain only numbers.");
      return;
    }
  
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const [errors, setErrors] = useState({});

  const proceedToSeatSelection = () => {
    setIsSubmitting(true);
    setErrors({});
  
    const { passengerf_name, passengerl_name, passenger_dateofbirth, passenger_phone, passenger_email } = details;
  
    // Check if all fields are filled
    const newErrors = {};
    if (!passengerf_name) newErrors.passengerf_name = "First name is required.";
    if (!passengerl_name) newErrors.passengerl_name = "Last name is required.";
    if (!passenger_dateofbirth) newErrors.passenger_dateofbirth = "Date of birth is required.";
    if (!passenger_phone) newErrors.passenger_phone = "Phone number is required.";
    if (!passenger_email) newErrors.passenger_email = "Email is required.";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
  
    // Validate date of birth
    const dob = new Date(passenger_dateofbirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
  
    if (age < 5) {
      setErrors({ passenger_dateofbirth: "Passenger must be at least 5 years old." });
      setIsSubmitting(false);
      return;
    }
  
    // Proceed to seat selection
    navigate(`/seat-selection/${trainId}`, { state: { passengerDetails: details, trainDetails } });
    setIsSubmitting(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Personal Details for Train ID: {trainId}</h1>
      {trainDetails && (
        <div style={{ marginBottom: "20px" }}>
          <p><strong>Train Name:</strong> {trainDetails.name}</p>
            <p><strong>Source:</strong> {trainDetails.source}</p>
            <p><strong>Destination:</strong> {trainDetails.destination}</p>
            <p><strong>Departure Time:</strong> {trainDetails.departure_time}</p>
            <p><strong>Arrival Time:</strong> {trainDetails.arrival_time}</p>
          </div>
        )}
        <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          name="passengerf_name"
          placeholder="First Name"
          value={details.passengerf_name}
          onChange={handleChange}
          style={{ padding: "10px", fontSize: "16px" }}
          required
        />
        {errors.passengerf_name && <span style={{ color: "red" }}>{errors.passengerf_name}</span>}
      
        <input
          type="text"
          name="passengerl_name"
          placeholder="Last Name"
          value={details.passengerl_name}
          onChange={handleChange}
          style={{ padding: "10px", fontSize: "16px" }}
          required
        />
        {errors.passengerl_name && <span style={{ color: "red" }}>{errors.passengerl_name}</span>}
      
        <input
          type="date"
          name="passenger_dateofbirth"
          placeholder="Date of Birth"
          value={details.passenger_dateofbirth}
          onChange={handleChange}
          style={{ padding: "10px", fontSize: "16px" }}
          required
        />
        {errors.passenger_dateofbirth && <span style={{ color: "red" }}>{errors.passenger_dateofbirth}</span>}
      
        <input
          type="text"
          name="passenger_phone"
          placeholder="Phone"
          value={details.passenger_phone}
          onChange={handleChange}
          style={{ padding: "10px", fontSize: "16px" }}
          required
        />
        {errors.passenger_phone && <span style={{ color: "red" }}>{errors.passenger_phone}</span>}
      
        <input
          type="email"
          name="passenger_email"
          placeholder="Email"
          value={details.passenger_email}
          onChange={handleChange}
          style={{ padding: "10px", fontSize: "16px" }}
          required
        />
        {errors.passenger_email && <span style={{ color: "red" }}>{errors.passenger_email}</span>}
      
        <button
          type="button"
          onClick={proceedToSeatSelection}
          disabled={isSubmitting}
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: isSubmitting ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isSubmitting ? "Proceeding..." : "Proceed to Seat Selection"}
        </button>
      </form>
    </div>
  );
};

export default PersonalDetails;