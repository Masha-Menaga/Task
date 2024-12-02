import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default styles
import "./Calender.css"; // Optional: Add custom styles

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log("Selected Date:", newDate); // Logs the selected date
  };

  return (
    <div className="calendar-container">
      <h1>My Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileClassName={({ date, view }) => {
          // Add custom class for specific dates
          if (date.getDate() === new Date().getDate()) {
            return "today"; // Highlight current day
          }
          return null;
        }}
      />
    </div>
  );
};

export default MyCalendar;
