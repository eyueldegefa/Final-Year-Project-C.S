import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Pages/Config/firebase"; // Import Firebase Firestore config
import TrainSearch from "../TrainSearch/TrainSearch";
import SearchResults from "../SearchResult/SearchResult";

const Check = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchCriteria) => {
    setLoading(true);
    try {
      const trainsRef = collection(db, "trains");
      const q = query(
        trainsRef,
        where("source", "==", searchCriteria.source),
        where("destination", "==", searchCriteria.destination),
        where("date", "==", searchCriteria.date)
      );
  
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        alert("No trains found for the given criteria.");
        setSearchResults([]);
      } else {
        const results = querySnapshot.docs.map((doc) => doc.data());
        setSearchResults(results);
      }
    } catch (error) {
      console.error("Error details:", error); // Log detailed error
      alert(`Error fetching train data: ${error.message}`); // Show user-friendly message
    }
    setLoading(false);
  };
  

  return (
    <div>
      <h1>Train Booking System</h1>
      <TrainSearch onSearch={handleSearch} />
      {loading ? <p>Loading...</p> : <SearchResults trains={searchResults} />}
    </div>
  );
};

export default Check;
