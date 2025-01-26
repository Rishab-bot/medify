import React, { useState } from 'react';

const SearchResults = ({ hospitals, searchTriggered }) => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  // Function to handle hospital click and open the booking form
  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  // Handle form submission to save the booking
  const handleBookingSubmit = () => {
    const newBooking = {
      ...selectedHospital,
      bookingDate,
      bookingTime,
    };

    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Clear the selected hospital and form fields
    setSelectedHospital(null);
    setBookingDate('');
    setBookingTime('');
  };

  return (
    <div>
      {searchTriggered && hospitals.length === 0 ? (
        <p>No hospitals found for the selected location.</p>
      ) : (
        <div>
          <h1>{hospitals.length} medical centers available</h1>
          {hospitals.map((hospital, index) => (
            <div
              key={index}
              className="hospital-card"
              onClick={() => handleHospitalClick(hospital)}
            >
              <h3>{hospital['Hospital Name']}</h3>
              <p>{hospital.Address}</p>
              <p>{hospital.City}, {hospital.State}</p>
              <p>Rating: {hospital['Hospital overall rating']}</p>
            </div>
          ))}

          {selectedHospital && (
            <div className="appointment-form">
              <h2>Book Appointment for {selectedHospital['Hospital Name']}</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(); }}>
                <div>
                  <label htmlFor="booking-date">Booking Date:</label>
                  <input
                    type="date"
                    id="booking-date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="booking-time">Booking Time:</label>
                  <input
                    type="time"
                    id="booking-time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Submit Booking</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
