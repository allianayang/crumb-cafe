import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Timer from './components/Timer.js';
import TaskList from './components/TaskList.js';
import SettingsButton from './components/SettingsButton.js';
import PixelBorder from './components/PixelBorder.js';
import { Typography, Paper, Stack, Button, Box} from '@mui/material';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import SavingsTwoToneIcon from '@mui/icons-material/SavingsTwoTone';

const theme = createTheme({
  typography: {
    fontFamily: '"medodica"'
  },
  palette: {
    primary: {
      main: '#A68A64', // blue
      dark: '#582F0E'
    },
    secondary: {
      main: '#656D4A', // pink/red
    },
    background: {
      paper: '#CEC9B6',
    },
    text: {
      primary: '#582F0E'
    }
  }
});

function App() {
  const [page, setPage] = useState('home');
  const [money, setMoney] = useState(100) // this needs to be preloaded

  const pageTimer = () => {
    setPage('timer')
  }

  const pageHome = () => {
    setPage('home')
  }

  const pageCafe = () => {
    setPage('cafe')
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ padding: 20, margin: 'auto', maxWidth: '600px', textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
      <Box sx={{mb: 4}} >
        <PixelBorder theme={theme}>
          <Typography variant="h4">Cozy Crumb Café</Typography>
        </PixelBorder>
      </Box>
  
      {page === 'home' &&
      <>
        <Stack direction="row" spacing={10} sx={{ justifyContent: "stretch", alignItems: "flex-start" }}>
          <PixelBorder theme={theme}>
            <TaskList/>
          </PixelBorder>
          <Stack spacing={2}>
            <Button variant="outlined" onClick={pageTimer}><HourglassTopTwoToneIcon/></Button>
            <Button variant="outlined" onClick={pageCafe}>Enter Cafe</Button>
            <SettingsButton/>
            <Stack direction="row" spacing={1} sx={{justifyContent: 'center', alignItems: 'center'}}>
              <Typography variant='h3' color='primary'>{money}</Typography>
              <SavingsTwoToneIcon fontSize='large' color='primary' sx={{pb: 0.5}}/>
            </Stack>
          </Stack>

        </Stack>
      </>
      }

      {page === 'timer' && 
      <>
        <Timer/>
        <Button onClick={pageHome}><FormatListBulletedTwoToneIcon/></Button>
      </>}

      {page === 'cafe' &&
      <>
      pets will be displayed here
      <Button onClick={pageHome}><FormatListBulletedTwoToneIcon/></Button>
      <Button onClick={pageTimer}><HourglassTopTwoToneIcon/></Button>
      </>}
      </Paper>
    </ThemeProvider>
  );
}

export default App;