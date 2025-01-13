import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PersonalDetails() {
  const location = useLocation(); // Access the state passed via navigate
  const navigate = useNavigate();
  const { train } = location.state || {}; // Destructure the train details

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.age) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    navigate("/seat-selection", { state: { train, personalDetails: formData } });
  };

  return (
    <div>
      <h1>Personal Details</h1>
      {train && (
        <div>
          <p>Train: {train.name}</p>
          <p>From: {train.source}</p>
          <p>To: {train.destination}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} />
        <button type="submit">Proceed to Seat Selection</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default PersonalDetails;
