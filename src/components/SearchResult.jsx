import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookingSection } from "./BookingSection"; // Import the booking component

export function SearchResults({ selectedState, selectedCity }) {
  const [medicalCenters, setMedicalCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null); // Track the selected center for booking

  // Fetch medical centers based on selected state and city
  useEffect(() => {
    if (selectedState && selectedCity) {
      const fetchMedicalCenters = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`
          );
          setMedicalCenters(response.data);
        } catch (error) {
          console.error("Error fetching medical centers:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMedicalCenters();
    }
  }, [selectedState, selectedCity]);

  return (
    <div className="search-results">
      {loading ? (
        <p>Loading medical centers...</p>
      ) : medicalCenters && medicalCenters.length > 0 ? (
        <div className="results-list">
          {medicalCenters.map((center, index) => (
            <div key={index} className="medical-center">
              <h3>{center["Hospital Name"]}</h3>
              <p>
                <strong>Address:</strong> {center["Address"]}
              </p>
              <p>
                <strong>Phone:</strong> {center["Phone Number"]}
              </p>
              <p>
                <strong>Hospital Type:</strong> {center["Hospital Type"]}
              </p>
              <p>
                <strong>Emergency Services:</strong> {center["Emergency Services"]}
              </p>
              <button onClick={() => setSelectedCenter(center)}>
                Book FREE Center Visit
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No medical centers found in {selectedCity}, {selectedState}.</p>
      )}

      {/* Render the booking section if a center is selected */}
      {selectedCenter && (
        <BookingSection 
          center={selectedCenter} 
          onClose={() => setSelectedCenter(null)} // Close booking section
        />
      )}
    </div>
  );
}
