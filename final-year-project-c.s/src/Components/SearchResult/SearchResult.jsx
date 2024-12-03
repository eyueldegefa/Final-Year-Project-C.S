// import React from "react";
// import { useNavigate } from "react-router-dom";

// const SearchResult = ({ trains }) => {
//   const navigate = useNavigate();

//   const handleBook = (train) => {
//     navigate("/booking", { state: { train } });
//   };

//   return (
//     <ul>
//       {trains.map((train, index) => (
//         <li key={index}>
//           <strong>{train.name}</strong> - {train.departure} to {train.arrival} <br />
//           Seats: {train.seatsAvailable} | Price: ${train.price} <br />
//           <button onClick={() => handleBook(train)}>Book Now</button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default SearchResult;

