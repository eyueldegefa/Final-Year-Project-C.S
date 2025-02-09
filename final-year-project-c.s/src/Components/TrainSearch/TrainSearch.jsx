import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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

  const handleBookNow = (train) => {
    if (!train.train_id) { // Updated to match database field
      alert("Unable to proceed. Train ID is missing.");
      return;
    }
    navigate(`/personal-details/${train.train_id}`, { state: { train } });
  };

  return (
    <div>
      <h1>Search Results</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {searchResults.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Train Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Date</th>
              <th>Price</th>
              <th>Seats Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((train) => {
              console.log("Train data:", train); // Debugging log
              return (
                <tr key={train.train_id}>
                  <td>{train.name}</td>
                  <td>{train.source}</td>
                  <td>{train.destination}</td>
                  <td>{train.departure_time.slice(0, 5)}</td>
                  <td>{train.arrival_time.slice(0, 5)}</td>
                  <td>{new Date(train.date).toLocaleDateString}</td>
                  <td>{train.price}</td>
                  <td>{train.seats_available}</td>
                  <td>
                    <button onClick={() => handleBookNow(train)}>Book Now</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        !error && <p>No trains found for the given criteria.</p>
      )}
    </div>
  );
};

export default TrainSearch;
