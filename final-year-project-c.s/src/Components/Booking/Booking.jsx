import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainIcon from '@mui/icons-material/Train';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import '../../App.css';
import './Booking.css';


function Booking() {
  const [formData, setFormData] = useState({ source: "", destination: "", date: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle train search
  const handleSearch = () => {
    if (!formData.source || !formData.destination || !formData.date) {
      setError("Please fill out all fields before searching.");
      return;
    }
    setError(""); // Clear any previous errors
    console.log("Navigating to results with:", formData); // Debugging log
    navigate("/search-results", { state: { searchCriteria: formData } });
  };

  return (
    <section className='bookingWrapper bg-white text-dark pb-5 text-center'>
        <div className='d-flex row ms-1'>
            <p className='col-4 py-4 bottomRed'><TrainIcon/> Search trains</p>
            <p className='col-4 py-4 bottomRed'><BookmarksIcon/> Manage booking / Check-in</p>
            <p className='col-4 py-4 bottomRed'><DoubleArrowRoundedIcon />What's on your train rail</p>
        </div>
        <div className='text-center'>
          <div className='row ms-1 gap-2'>
            <input className='col-3 py-3 px-5' name="source" type="text"  placeholder='From station' value={formData.source} onChange={handleChange}/>
            <CompareArrowsIcon className='col-1'/>
            <input className='col-3 py-3 px-5' name="destination" type="text" placeholder='To station' value={formData.destination} onChange={handleChange}/>
            <input className='col-3 py-3 px-5 ms-4 text-secondary' type="date" name="date" id="date" placeholder='Departing' value={formData.date} onChange={handleChange} />
            {/* <p className='col-2 buttons bg-danger py-3 text-white rounded fs-5'>Continue</p> */}
            <button className='col-2 buttons bg-danger py-3 text-white rounded fs-5' onClick={handleSearch}>Search</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
    </section>
  )
}

export default Booking



//the working one
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Booking() {
//   const [formData, setFormData] = useState({ source: "", destination: "", date: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle train search
//   const handleSearch = () => {
//     if (!formData.source || !formData.destination || !formData.date) {
//       setError("Please fill out all fields before searching.");
//       return;
//     }
//     setError(""); // Clear any previous errors
//     console.log("Navigating to results with:", formData); // Debugging log
//     navigate("/search-results", { state: { searchCriteria: formData } });
//   };

//   return (
//     <div>
//       <h1>Search Trains</h1>
//       <div>
//         <input
//           type="text"
//           name="source"
//           placeholder="Enter source"
//           value={formData.source}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="destination"
//           placeholder="Enter destination"
//           value={formData.destination}
//           onChange={handleChange}
//         />
//         <input
//           type="date"
//           name="date"
//           placeholder="Select date"
//           value={formData.date}
//           onChange={handleChange}
//         />
//         <button onClick={handleSearch}>Search</button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default Booking;


