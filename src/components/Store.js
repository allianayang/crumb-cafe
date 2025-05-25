import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import { fruitveg, staples, dairy } from '../ingredients.js';
import theme from '../theme.js';
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';
import { useMoney } from '../context/MoneyContext';
import { useInventory } from '../context/InventoryContext.js';


const ingredients = [fruitveg, staples, dairy]

const pixelBorder = {
  border: '2px solid black',
  boxShadow: '2px 2px 0px #000',
};

export default function Store() {
  const [tabIndex, setTabIndex] = useState(0);
  const [errMsg, setErrMsg] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const { coins, subtractCoins } = useMoney();
  const { inventory, setInventory } = useInventory();

  const storeItems = ingredients[tabIndex];

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleBuy = (item) => {
    if (coins > 0) {
      subtractCoins(1)
      const existingItem = inventory.find(i => i.id === item.id);
      let updatedInventory;

      if (existingItem) {
        // Item exists → update count
        updatedInventory = inventory.map(i =>
          i.id === item.id ? { ...i, count: i.count + 1 } : i
        );
      } else {
        // Item doesn't exist → add it with count = 1
        updatedInventory = [...inventory, { id: item.id, count: 1 }];
      }

      setInventory(updatedInventory);
      setConfirmMsg(item.name)
      setShowConfirm(true)
    } else {
      setErrMsg(true)
    }
  }

  const handleErr = () => {
    setErrMsg(false)
  }

  const handleConfirm = () => {
    setShowConfirm(false)
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{mb: 1, backgroundColor: `${theme.palette.primary.main}`}}>
      <Tabs value={tabIndex} onChange={handleChange} sx={{flexGrow: 1}}>
        <Tab label="Fruit & Veg" />
        <Tab label="Staples"/>
        <Tab label="Dairy"/>
      </Tabs>
      <Box sx={{pr: 4, justifyContent: 'center'}}>
        {coins} <PaidTwoToneIcon/>
      </Box>
      </Stack>
    <Grid container spacing={1}>
      {storeItems.map(item => (
        <Grid item xs={3} key={item.id}>
          <Paper
            elevation={0}
            sx={{
              ...pixelBorder,
              backgroundColor: '#fffbe6',
              width: '29px',
              height: '30px',
              position: 'relative',
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                top: '12px',
                position: 'absolute',
                height: '35px',
                width: '35px',
                imageRendering: 'pixelated',
              }}
            />

            {/* Optional item name */}
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                mt: 4,
                fontSize: 14,
              }}
            >
              {item.name}
            </Typography>
            
            <Button onClick={() => handleBuy(item)} sx={{ mt: 7 }}>
              Buy
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
    {errMsg && 
    <Box>
      Not enough funds
      <Button onClick={handleErr}>Ok</Button>
    </Box>
    }
    {showConfirm && 
    <Box>
      You bought a {confirmMsg}
      <Button onClick={handleConfirm}>Ok</Button>
    </Box>
    }
    </Box>
  )
}