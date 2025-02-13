import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TrainRoundedIcon from '@mui/icons-material/TrainRounded';
import "./TrainSearch.css"; // Import the CSS file

const TrainSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const searchCriteria = location.state?.searchCriteria;

  useEffect(() => {
    if (!searchCriteria) {
      setError("Search criteria are missing. Please start a new search.");
      return;
    }

    const fetchResults = async () => {
      try {
        console.log("Fetching trains with criteria:", searchCriteria); // Debugging
        const response = await axios.post("http://localhost:7676/api/search-trains", searchCriteria);
        setSearchResults(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching trains:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Failed to fetch search results.");
      }
    };

    fetchResults();
  }, [searchCriteria]);

  const handleSelect = (train) => {
    if (!train.train_id) {
      alert("Unable to proceed. Train ID is missing.");
      return;
    }
  
    navigate(`/personal-details/${train.train_id}`, {
      state: {
        train, // Pass the entire train object
        source: train.source, // Pass source
        destination: train.destination, // Pass destination
        price: train.price, // Pass price
      },
    });
  };

  return (
    <div className="train-search-container">
      <h1 className="text-center my-1">Available Trains</h1>
      {error && <p className="error-message">{error}</p>}

      {searchResults.length > 0 ? (
        <div className="train-list ">
          {searchResults.map((train) => {
            console.log("Train data:", train); // Debugging log
            return (
              <div key={train.train_id} className="train-card my-4">
                <div className="train-info d-flex w-75">
                  <div className="left-side text-end me-2">
                    <h3>{new Date(train.date).toLocaleDateString()}</h3>
                    <h3 className="fw-bold">{train.source}</h3>
                    <h3>{train.departure_time.slice(0, 5)} </h3>
                    
                  </div>
                  <hr /><TrainRoundedIcon/> <hr />
                  <div className="right-side ms-2">
                    <h3>{new Date(train.date).toLocaleDateString()}</h3>
                    <h3 className="fw-bold">{train.destination}</h3>
                    <h3>{train.arrival_time.slice(0, 5)}</h3>
                  </div>
                </div>
                <div className="train-details w-25">
                  <p className="train-price border border-gray py-5 px-3 fw-bold">Price: {train.price} ETB</p>
                  <button className="select-button py-3 px-2" onClick={() => handleSelect(train)}>
                    Select
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !error && <p className="no-results">No available trains found for the given criteria.</p>
      )}
    </div>
  );
};

export default TrainSearch;