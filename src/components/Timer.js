import React, { useState, useEffect } from 'react';
import { Typography, Button, Stack } from '@mui/material';
import theme from '../theme.js';

const pixelButtonStyles = {
  fontSize: '20px',
  backgroundColor: `${theme.palette.primary.light}`, // or your pixel-style color
  border: `2px solid ${theme.palette.primary.dark}`,
  borderRadius: 0,
  padding: '8px 16px',
  color: `${theme.palette.primary.dark}`,
  boxShadow: `2px 2px 0 ${theme.palette.primary.dark}`,
  textTransform: 'none',
  transition: 'all 0.1s ease-in-out',
  '&:active': {
    boxShadow: `0 0 0 ${theme.palette.primary.dark}`,
    transform: 'translate(2px, 2px)',
  },
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}`,
  },
};

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
    <Stack spacing={2} sx={{height: '100%', p: 4, alignItems: 'center', justifyContent: 'center'}}>
      <Typography variant="h4">{isFocus ? 'Baking Now' : 'Cooling Down'}</Typography>
      <Typography variant="h2" style={{ fontWeight: 'bold' }}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Typography>

      <Stack direction="row" spacing={4} sx={{justifyContent: 'center'}}>
      <Button
        color={isRunning ? 'secondary' : 'primary'}
        onClick={toggleTimer}
        style={pixelButtonStyles}
      >
        {isRunning ? 'Pause' : 'Start'}
      </Button>

      <Button onClick={resetTimer} sx={pixelButtonStyles}>Reset</Button>
      </Stack>
    </Stack>
  )
}