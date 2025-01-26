import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Pages
import SearchResults from './pages/SearchResults';
import MyBookings from './pages/MyBookings';

const App = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);

  // Fetch states from the backend
  useEffect(() => {
    axios.get('https://meddata-backend.onrender.com/states')
      .then(response => setStates(response.data))
      .catch(error => console.error(error));
  }, []);

  // Fetch cities based on the selected state
  const handleStateChange = (state) => {
    setSelectedState(state);
    axios.get(`https://meddata-backend.onrender.com/cities/${state}`)
      .then(response => setCities(response.data))
      .catch(error => console.error(error));
  };

  // Fetch hospitals based on the selected state and city
  const fetchHospitals = () => {
    if (selectedState && selectedCity) {
      const url = `https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`;
      console.log('Fetching hospitals with URL:', url); // Log URL for debugging

      axios.get(url)
        .then(response => {
          console.log('Fetched hospitals:', response.data); // Log the response data
          setHospitals(response.data);
          setSearchTriggered(true); // Set search as triggered after fetching hospitals
        })
        .catch(error => {
          console.error('Error fetching hospitals:', error);
        });
    } else {
      console.log('State or City is not selected');
    }
  };

  return (
    <Router>
      <div className="app">
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/my-bookings">My Bookings</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route
            path="/"
            element={
              <div className="search-section">
                <div id="state">
                  <select onChange={(e) => handleStateChange(e.target.value)} value={selectedState}>
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                
                <div id="city">
                  <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" onClick={fetchHospitals}>Search</button>
                <SearchResults hospitals={hospitals} searchTriggered={searchTriggered} />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
