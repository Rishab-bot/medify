import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SearchSection.css";

export function SearchSection({ onSelectionChange }) {
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get("https://meddata-backend.onrender.com/states");
        setState(response.data);
      } catch (error) {
        console.error("Error fetching states", error);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(`https://meddata-backend.onrender.com/cities/${selectedState}`);
          setCity(response.data);
        } catch (error) {
          console.log("Error fetching cities", error);
        }
      };
      fetchCities();
    } else {
      setCity([]);
    }
  }, [selectedState]);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity(""); // Reset city when state changes
    onSelectionChange(state, ""); // Pass updated state and reset city to App.js
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    onSelectionChange(selectedState, city); // Pass selected state and city to App.js
  };

  return (
    <div className="search-section">
      <div className="select-container">
        {/* State Dropdown */}
        <div id="state">
          <label htmlFor="state-select">State:</label>
          <select
            id="state-select"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">Select a State</option>
            {state.length > 0 ? (
              state.map((stateItem, index) => (
                <option key={index} value={stateItem}>
                  {stateItem}
                </option>
              ))
            ) : (
              <option>Loading states...</option>
            )}
          </select>
        </div>

        {/* City Dropdown */}
        {selectedState && (
          <div id="city">
            <label htmlFor="city-select">City:</label>
            <select
              id="city-select"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">Select a City</option>
              {city.length > 0 ? (
                city.map((cityItem, index) => (
                  <option key={index} value={cityItem}>
                    {cityItem}
                  </option>
                ))
              ) : (
                <option>Loading cities...</option>
              )}
            </select>
          </div>
        )}

        {/* Search Button */}
        <button
          type="submit"
          onClick={() =>
            console.log("Fetching medical centers for", selectedState, selectedCity)
          }
        >
          Search
        </button>
      </div>
    </div>
  );
}
