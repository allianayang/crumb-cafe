import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Timer from './components/Timer.js';
import TaskList from './components/TaskList.js';
import SettingsButton from './components/SettingsButton.js';
import PixelBorder from './components/PixelBorder.js';
import Background from './components/Background.js';
import InventoryModal from './components/InventoryModal.js';
import OrderMenu from './components/OrderMenu.js';
import Store from './components/Store.js';
import GemStore from './components/GemStore.js';
import Lounge from './components/Lounge.js';
import {InventoryProvider} from './context/InventoryContext.js';
import { MoneyProvider } from './context/MoneyContext.js';
import theme from './theme.js';
import { Typography, Paper, Stack, Button, IconButton, Box, Tabs, Tab} from '@mui/material';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import AddBusinessTwoToneIcon from '@mui/icons-material/AddBusinessTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ChairTwoToneIcon from '@mui/icons-material/ChairTwoTone';
import backpack from './assets/backpack1.png';

const pixelButtonStyles = {
  margin: 1,
  fontFamily: 'monospace',
  backgroundColor: `${theme.palette.primary.light}`, // or your pixel-style color
  border: `2px solid ${theme.palette.primary.dark}`,
  borderRadius: 0,
  padding: '8px 16px',
  color: `${theme.palette.primary.dark}`,
  boxShadow: `2px 2px 0 ${theme.palette.primary.dark}`,
  textTransform: 'none',
  transition: 'all 0.1s ease-in-out',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light, // same as default
    color: theme.palette.primary.dark,            // override color change
    fontWeight: 'normal',                         // override font weight
  },
  '&:active': {
    boxShadow: `0 0 0 ${theme.palette.primary.dark}`,
    transform: 'translate(2px, 2px)',
  },
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}`,
  },
};

function App() {
  const [page, setPage] = useState('home');
  const [money, setMoney] = useState(100) // this needs to be preloaded
  const [soundOn, setSoundOn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sound = new Audio('./assets/mouse-click.mp3');

  // Function to handle the click and play sound
  const handleClick = (event) => {
    if (soundOn) {
      sound.play();
    }
  };

  useEffect(() => {
    // Attach the event listener for mouse clicks
    document.addEventListener('click', handleClick);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const pageTimer = () => {
    setPage('timer')
  }

  const pageHome = () => {
    setPage('home')
  }

  const pageCafe = () => {
    setPage('cafe')
  }

  const pageStore = () => {
    setPage('store')
  }

  const pageGemStore = () => {
    setPage('gemstore')
  }

  const pageLounge = () => {
    setPage('lounge')
  }

  return (
    <InventoryProvider>
    <MoneyProvider>
    <ThemeProvider theme={theme}>
      <Background>
        <Box sx={{mb: 4}} >
          <PixelBorder theme={theme}>
            <Typography variant="h4">Cozy Crumb Café</Typography>
          </PixelBorder>
        </Box>
        <Stack direction="row" spacing={4} sx={{ justifyContent: "stretch", alignItems: "flex-start"}}>
        {page === 'home' &&
        <>
          <Box sx={{ flexGrow: 1 }}>
          <PixelBorder theme={theme}>
            <TaskList/>
          </PixelBorder>
          </Box>
        </>
        }

        {page === 'timer' && 
        <>
        <Box sx={{ flexGrow: 1 }}>
        <Timer/>
        </Box>
          
        </>}

        {page === 'cafe' &&
        <>
        <Stack spacing={9} sx={{ flexGrow: 1}}>
          <OrderMenu/>
        </Stack>
        </>}

        {page === 'store' &&
        <>
        <Stack spacing={9} sx={{ flexGrow: 1}}>
          <Store/>
        </Stack>
        </>}

        {page === 'gemstore' &&
        <>
        <Stack spacing={9} sx={{ flexGrow: 1}}>
          <GemStore/>
        </Stack>
        </>}

        {page === 'lounge' &&
        <>
        <Stack spacing={9} sx={{ flexGrow: 1}}>
          <Lounge/>
        </Stack>
        </>}

        <Stack>
          <PixelBorder>
          <Stack spacing={2} sx={{p: 1, maxHeight: '260px'}}>
            <Tabs
            variant="scrollable"
            orientation="vertical"
            scrollButtons={false}
            >
            <SettingsButton style={pixelButtonStyles} setSoundOn={setSoundOn}/>
            <Button onClick={pageHome} sx={pixelButtonStyles}><FormatListBulletedTwoToneIcon/></Button>
            <Button onClick={pageTimer} sx={pixelButtonStyles}><HourglassTopTwoToneIcon/></Button>
            <IconButton onClick={pageCafe} sx={pixelButtonStyles}><MeetingRoomTwoToneIcon/></IconButton>
            <IconButton onClick={pageStore} sx={pixelButtonStyles}><StorefrontTwoToneIcon/></IconButton>
            <IconButton onClick={pageGemStore} sx={pixelButtonStyles}><AddBusinessTwoToneIcon/></IconButton>
            <IconButton onClick={pageGemStore} sx={pixelButtonStyles}><EmojiEventsTwoToneIcon/></IconButton>
            <IconButton onClick={pageGemStore} sx={pixelButtonStyles}><EqualizerIcon/></IconButton>
            <IconButton onClick={pageLounge} sx={pixelButtonStyles}><ChairTwoToneIcon/></IconButton>
            </Tabs>
          </Stack>
          </PixelBorder>
          <IconButton
            onClick={() => {
              setIsModalOpen(true);  // Open the modal
            }}
            disableRipple
            disableFocusRipple
            size="small"
            sx={{
              p: 0,
              '&:hover': {
                backgroundColor: 'transparent', // remove hover background
              },
            }}
          >
            <img
              src={backpack}
              style={{
                height: '200%',
                width: '200%',
                imageRendering: 'pixelated',
              }}
            />
          </IconButton>
          {isModalOpen && 
          <InventoryModal 
            isCookingMode={false} 
            onClose={() => setIsModalOpen(false)}/>}
        </Stack>
        </Stack>
      </Background>
    </ThemeProvider>
    </MoneyProvider>
    </InventoryProvider>
  );
}

export default App;