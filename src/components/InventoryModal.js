import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Stack,
  Button,
  Modal,
  Box,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import ingredients from '../ingredients';
import DiamondTwoToneIcon from '@mui/icons-material/DiamondTwoTone';
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';
import { useInventory } from '../context/InventoryContext';
import { useMoney } from '../context/MoneyContext';

const pixelBorder = {
  border: '2px solid black',
  boxShadow: '2px 2px 0px #000',
};

export default function InventoryModal({ isCookingMode, onClose, selected, setSelected }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const safeSelectedItems = selected || [];
  const canSelect = typeof setSelected === 'function';

  const { inventory } = useInventory();
  const { coins, gems } = useMoney();

  // Show previously selected items when modal is opened in cooking mode
  useEffect(() => {
    if (isCookingMode) {
      setSelected(selected || []);
    }
  }, [isCookingMode, selected]);

  const displayInventory = inventory.map(entry => {
    const itemData = ingredients.find(i => i.id === entry.id);
    return {
      ...entry,
      name: itemData?.name || 'Unknown',
      image: itemData?.image || '',
    };
  });

  const handleItemClick = (item) => {
    if (!canSelect) return;
    if (safeSelectedItems.includes(item.id)) {
      setSelected(prevSelected => prevSelected.filter(id => id !== item.id)); // Unselect item
    } else if (safeSelectedItems.length < 3) {
      setSelected(prevSelected => [...prevSelected, item.id]); // Select item
    }
  };

  return (
    <>
      <Modal open={isModalOpen} onClose={onClose}>
        <Box
          sx={{
            ...pixelBorder,
            width: 435,
            backgroundColor: '#f4f0e0',
            margin: '100px auto',
            padding: 2,
            fontFamily: 'monospace',
            position: 'relative',
          }}
        >
          <Stack direction="row" spacing={10}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {isCookingMode ? 'Select Items for Cooking' : 'Inventory'}
          </Typography>
          <Stack direction="row" spacing={10}>
            {coins} <PaidTwoToneIcon/>
            {gems} <DiamondTwoToneIcon/>
          </Stack>
          </Stack>

          <Grid container spacing={1}>
            {displayInventory.map(item => (
              <Grid item xs={3} key={item.id}>
                <Paper
                  elevation={0}
                  sx={{
                    ...pixelBorder,
                    backgroundColor: safeSelectedItems.includes(item.id) ? '#e1e5d4' : '#fffbe6',
                    width: '28px',
                    height: '28px',
                    position: 'relative',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isCookingMode ? 'pointer' : 'default',
                  }}
                  onClick={() => isCookingMode && handleItemClick(item)} // Only clickable in cooking mode
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

                  {/* Count box */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 2,
                      right: 2,
                      px: 0.5,
                      backgroundColor: '#444',
                      color: '#fff',
                      border: '1px solid #000',
                      boxShadow: '1px 1px 0px #000',
                      fontSize: 12,
                      lineHeight: 1,
                    }}
                  >
                    x{item.count}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          {/* Close button */}
          <Button
            onClick={onClose}
            sx={{
              mt: 2,
              fontFamily: 'monospace',
              backgroundColor: '#e0c177',
              border: '2px solid #000',
              boxShadow: '2px 2px 0 #000',
              '&:hover': {
                backgroundColor: '#c5a25a',
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
