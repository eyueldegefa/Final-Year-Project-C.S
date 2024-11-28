import React from "react";

const TrainList = ({ trains, onBook }) => {
  return (
    <div className="train-list">
      {trains.length === 0 ? (
        <p>No trains available for the selected criteria.</p>
      ) : (
        trains.map((train, index) => (
          <div key={index} className="train-card">
            <h3>{train.name}</h3>
            <p>Source: {train.source}</p>
            <p>Destination: {train.destination}</p>
            <p>Departure: {train.departureTime}</p>
            <p>Arrival: {train.arrivalTime}</p>
            <p>Fare: {train.fare}</p>
            <p>Seats Available: {train.availableSeats}</p>
            <button onClick={() => onBook(train)}>Book Now</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TrainList;
