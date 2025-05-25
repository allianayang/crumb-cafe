import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"medodica"'
  },
  palette: {
    primary: {
      light: '#CEC9B6',
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

export default theme