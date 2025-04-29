import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';

export default function Timer() {
  // Pomodoro Timer States
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const [time, setTime] = useState(25 * 60); // Focus time is 25 minutes
  const [intervalId, setIntervalId] = useState(null);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Start or stop the timer
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalId);
    } else {
      const id = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(id);
            setIsFocus((prevFocus) => !prevFocus);
            return isFocus ? 5 * 60 : 25 * 60; // Switch between Focus and Break
          }
          return prevTime - 1;
        });
      }, 1000);
      setIntervalId(id);
    }
    setIsRunning(!isRunning);
  };

  // Reset the timer
  const resetTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setIsFocus(true);
    setTime(25 * 60);
  };

  return (
    <>
      <Typography variant="h6">{isFocus ? 'Focus Time' : 'Break Time'}</Typography>
      <Typography variant="h3" style={{ fontWeight: 'bold' }}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Typography>

      <Button
        variant="contained"
        color={isRunning ? 'secondary' : 'primary'}
        onClick={toggleTimer}
        style={{ margin: '20px 0' }}
      >
        {isRunning ? 'Pause' : 'Start'}
      </Button>

      <Button variant="outlined" onClick={resetTimer}>Reset</Button>
    </>
  )
}