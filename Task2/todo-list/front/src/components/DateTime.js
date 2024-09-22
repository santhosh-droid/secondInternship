// src/components/DateTime.js
import React, { useState, useEffect } from 'react';

const DateTime = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer when the component unmounts
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.date}>{formatDate(currentDate)}</div>
      <div style={styles.time}>{formatTime(currentDate)}</div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#fff',
  },
  date: {
    fontSize: '1.2rem',
    marginBottom: '5px',
  },
  time: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
};

export default DateTime;
