// src/components/SearchResults.js
import React from "react";

const SearchResults = ({ trains }) => {
  if (trains.length === 0) {
    return <p>No trains available for the selected route and date.</p>;
  }

  return (
    <div>
      <h3>Available Trains</h3>
      <ul>
        {trains.map((train, index) => (
          <li key={index}>
            <strong>{train.name || train.name }</strong> - {train.departure} to {train.arrival} <br />
            Seats: {train.seatsAvailable} | Price: ${train.price}
            <button onClick={() => SearchResults(train)}>Book Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
