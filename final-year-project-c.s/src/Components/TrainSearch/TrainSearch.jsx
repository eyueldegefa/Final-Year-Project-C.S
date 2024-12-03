// // src/components/TrainSearch.js
// import React, { useState } from "react";

// const TrainSearch = ({ onSearch }) => {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [date, setDate] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!source || !destination || !date) {
//       alert("Please fill in all fields!");
//       return;
//     }
//     onSearch({ source, destination, date });
//   };

//   return (
//     <div>
//       <h2>Search for Trains</h2>
//       <form onSubmit={handleSearch}>
//         <div>
//           <label>Source: </label>
//           <input
//             type="text"
//             value={source}
//             onChange={(e) => setSource(e.target.value)}
//             placeholder="Enter source station"
//             required
//           />
//         </div>
//         <div>
//           <label>Destination: </label>
//           <input
//             type="text"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//             placeholder="Enter destination station"
//             required
//           />
//         </div>
//         <div>
//           <label>Date: </label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Search</button>
//       </form>
//     </div>
//   );
// };

// export default TrainSearch;
