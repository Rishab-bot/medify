import React, { useState } from "react";
import './BookingSection.css';

export function BookingSection({ center, onClose }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }

    const booking = {
      hospitalName: center["Hospital Name"],
      address: center["Address"],
      phone: center["Phone Number"],
      date: selectedDate,
      time: selectedTime,
    };

    // Save booking to localStorage
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    existingBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    alert("Booking confirmed!");
    onClose(); // Close the booking section
  };

  return (
    <div className="booking-section">
      <h3>Book an Appointment at {center["Hospital Name"]}</h3>
      <p><strong>Address:</strong> {center["Address"]}</p>
      <p><strong>Phone:</strong> {center["Phone Number"]}</p>

      {/* Date Selector */}
      <label>
        <p>Select Date:</p>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      {/* Time Selector */}
      <label>
        <p>Select Time:</p>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">Select a time</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </label>

      {/* Buttons */}
      <div className="booking-actions">
        <button onClick={handleBooking}>Confirm Booking</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
