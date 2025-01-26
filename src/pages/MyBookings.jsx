import React, { useState, useEffect } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div>
          {bookings.map((booking, index) => (
            <div key={index} className="booking-card">
              <h3>{booking['Hospital Name']}</h3>
              <p>{booking.Address}</p>
              <p>City: {booking.City}, State: {booking.State}</p>
              <p>Booking Date: {booking.bookingDate}</p>
              <p>Booking Time: {booking.bookingTime}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
