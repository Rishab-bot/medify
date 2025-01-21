import React, { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbarr from "./components/Navbar";
import { SearchSection } from './components/SearchSection';
import { SearchResults } from './components/SearchResult';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyBookings from './components/MyBookings';

function App() {
  const [selectedState, setSelectedState] = useState(""); 
  const [selectedCity, setSelectedCity] = useState(""); 

  const handleSelection = (state, city) => {
    setSelectedState(state);
    setSelectedCity(city);
  };

  return (
    <Router>
      <div className="App">
        <Navbarr />
        <Routes>
          <Route path="/" element={
            <>
              <SearchSection onSelectionChange={handleSelection} />
              {selectedState && selectedCity && (
                <SearchResults selectedState={selectedState} selectedCity={selectedCity} />
              )}
            </>
          } />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
