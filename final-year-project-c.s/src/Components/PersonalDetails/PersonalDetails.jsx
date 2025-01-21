// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function PersonalDetails() {
//   const location = useLocation(); // Access the state passed via navigate
//   const navigate = useNavigate();
//   const { train } = location.state || {}; // Destructure the train details

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     age: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email || !formData.phone || !formData.age) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     setError("");
//     navigate("/seat-selection", { state: { train, personalDetails: formData } });
//   };

//   return (
//     <div>
//       <h1>Personal Details</h1>
//       {train && (
//         <div>
//           <p>Train: {train.name}</p>
//           <p>From: {train.source}</p>
//           <p>To: {train.destination}</p>
//         </div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} />
//         <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
//         <input type="number" name="age" placeholder="Age" onChange={handleChange} />
//         <button type="submit">Proceed to Seat Selection</button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }

// export default PersonalDetails;

// PersonalDetails.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PersonalDetails = ({ selectedTrain }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    passenger_name: "",
    passenger_age: "",
    passenger_phone: "",
    passenger_email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    console.log("Selected Train:", selectedTrain);
  
    if (
      !formData.passenger_name ||
      !formData.passenger_age ||
      !formData.passenger_phone ||
      !formData.passenger_email
    ) {
      alert("Please fill in all fields.");
      return;
    }
  
    console.log("Navigating to seat selection with data:", selectedTrain, formData);
    navigate("//seat-selection", {
      state: { selectedTrain, passengerDetails: formData },
    });
  };
  

  return (
    <div className="personal-details-container">
      <h2>Enter Personal Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Passenger Name:</label>
          <input
            type="text"
            name="passenger_name"
            value={formData.passenger_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Passenger Age:</label>
          <input
            type="number"
            name="passenger_age"
            value={formData.passenger_age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Passenger Phone:</label>
          <input
            type="text"
            name="passenger_phone"
            value={formData.passenger_phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Passenger Email:</label>
          <input
            type="email"
            name="passenger_email"
            value={formData.passenger_email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Proceed to Seat Selection</button>
      </form>
    </div>
  );
};

export default PersonalDetails;


