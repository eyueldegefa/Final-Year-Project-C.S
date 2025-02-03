import React from "react";
import { useLocation} from "react-router-dom";

const Success = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const { bookingDetails } = location.state || {};

  if (!bookingDetails) {
    return <div>No booking details found.</div>;
  }

  const { bookingReference, passengerDetails } = bookingDetails;

  // const handleProceedToPayment = () => {
  //   navigate("/payment", { state: { bookingReference, passengerDetails } });
  // };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px", maxWidth: "400px", margin: "auto" }}>
      <h2>Booking Confirmed!</h2>
      <h3>Booking Reference: {bookingReference}</h3>
    </div>
  );
};

export default Success;