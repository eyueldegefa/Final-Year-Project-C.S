// import React, { useState } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";

// const PersonalDetails = () => {
//   const { trainId } = useParams(); // Extract trainId from URL
//   const navigate = useNavigate();
//   const location = useLocation();
//   const trainDetails = location.state?.train;

//   const [details, setDetails] = useState({
//     passenger_name: "",
//     passenger_age: "",
//     passenger_phone: "",
//     passenger_email: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

//   console.log("Train details received:", trainDetails);
//   console.log("Train ID from URL:", trainId);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
//   };

//   // Confirm booking
//   const confirmBooking = async () => {
//     if (
//       !details.passenger_name ||
//       !details.passenger_age ||
//       !details.passenger_phone ||
//       !details.passenger_email
//     ) {
//       alert("Please fill in all the fields before confirming the booking.");
//       return;
//     }

//     setIsSubmitting(true); // Set loading state
//     try {
//       const response = await fetch("http://localhost:7676/api/confirm-booking", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           train_id: trainId, // Use trainId from URL
//           ...details,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Booking confirmed! Check your email for details.");
//         navigate("/success", { state: { bookingDetails: data } });
//       } else {
//         alert(data.error || "Failed to confirm booking.");
//       }
//     } catch (error) {
//       console.error("Error confirming booking:", error);
//       alert("An error occurred while confirming your booking.");
//     } finally {
//       setIsSubmitting(false); // Reset loading state
//     }
//   };

//   return (
//     <div>
//       <h1>Personal Details for Train ID: {trainId}</h1>
//       {trainDetails && (
//         <div>
//           <p>Train Name: {trainDetails.name}</p>
//           <p>Source: {trainDetails.source}</p>
//           <p>Destination: {trainDetails.destination}</p>
//           <p>Departure Time: {trainDetails.departure_time}</p>
//           <p>Arrival Time: {trainDetails.arrival_time}</p>
//         </div>
//       )}
//       <form>
//         <input
//           type="text"
//           name="passenger_name"
//           placeholder="Name"
//           value={details.passenger_name}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           name="passenger_age"
//           placeholder="Age"
//           value={details.passenger_age}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="passenger_phone"
//           placeholder="Phone"
//           value={details.passenger_phone}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="passenger_email"
//           placeholder="Email"
//           value={details.passenger_email}
//           onChange={handleChange}
//         />
//         <button type="button" onClick={confirmBooking} disabled={isSubmitting}>
//           {isSubmitting ? "Confirming..." : "Confirm Booking"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PersonalDetails;

// ------------------------------------------------------------------------------------
import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const PersonalDetails = () => {
  const { trainId } = useParams(); // Extract trainId from URL
  const navigate = useNavigate();
  const location = useLocation();
  const trainDetails = location.state?.train;

  const [details, setDetails] = useState({
    passenger_name: "",
    passenger_age: "",
    passenger_phone: "",
    passenger_email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  console.log("Train details received:", trainDetails);
  console.log("Train ID from URL:", trainId);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Proceed to seat selection
  const proceedToSeatSelection = () => {
    if (
      !details.passenger_name ||
      !details.passenger_age ||
      !details.passenger_phone ||
      !details.passenger_email
    ) {
      alert("Please fill in all the fields before proceeding to seat selection.");
      return;
    }

    navigate(`/seat-selection/${trainId}`, { state: { passengerDetails: details, trainDetails } });
  };

  return (
    <div>
      <h1>Personal Details for Train ID: {trainId}</h1>
      {trainDetails && (
        <div>
          <p>Train Name: {trainDetails.name}</p>
          <p>Source: {trainDetails.source}</p>
          <p>Destination: {trainDetails.destination}</p>
          <p>Departure Time: {trainDetails.departure_time}</p>
          <p>Arrival Time: {trainDetails.arrival_time}</p>
        </div>
      )}
      <form>
        <input
          type="text"
          name="passenger_name"
          placeholder="Name"
          value={details.passenger_name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="passenger_age"
          placeholder="Age"
          value={details.passenger_age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="passenger_phone"
          placeholder="Phone"
          value={details.passenger_phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="passenger_email"
          placeholder="Email"
          value={details.passenger_email}
          onChange={handleChange}
        />
        <button type="button" onClick={proceedToSeatSelection} disabled={isSubmitting}>
          {isSubmitting ? "Proceeding..." : "Proceed to Seat Selection"}
        </button>
      </form>
    </div>
  );
};

export default PersonalDetails;




