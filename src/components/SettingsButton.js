import React, { useState } from 'react';
import { Stack, IconButton, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export default function SettingsButton({style, setSoundOn}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton variant="outlined" onClick={handleClick} sx={style}><SettingsIcon/></IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Stack direction="row" sx={{height: '50%'}}>
          <MenuItem onClick={setSoundOn(false)}>Sound</MenuItem>
          <MenuItem onClick={handleClose}>Music</MenuItem>
          <MenuItem onClick={handleClose}>Save</MenuItem>
          <MenuItem onClick={handleClose}>Load</MenuItem>
          <MenuItem onClick={handleClose}>Exit</MenuItem>
        </Stack>
      </Menu>
    </>
  )
}