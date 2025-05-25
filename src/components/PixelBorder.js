import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme.js';


export default function PixelBorder({children}) {

  const pixelBorderOuter = {
    border: `1px solid ${theme.palette.primary.dark}`,
    boxShadow: `3px 0 0 ${theme.palette.primary.dark}, -3px 0 0 ${theme.palette.primary.dark}, 0 3px 0 ${theme.palette.primary.dark}, 0 -3px 0 ${theme.palette.primary.dark}`,
    justifyContent: 'center',
    alignItems: 'center'
  }

  const pixelBorder = {
    border: `4px solid ${theme.palette.primary.main}`,
    justifyContent: 'center',
    alignItems: 'center'
  }

  const pixelBorderInner = {
    border: `2.5px solid ${theme.palette.primary.dark}`,
    boxShadow: `1.5px 0 0 ${theme.palette.primary.dark}, -1.5px 0 0 ${theme.palette.primary.dark}, 0 1.5px 0 ${theme.palette.primary.dark}, 0 -1.5px 0 ${theme.palette.primary.dark}`,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${theme.palette.primary.light}`
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ ...pixelBorderOuter}}>
        <Box sx={{ ...pixelBorder }}>
          <Box sx={{ ...pixelBorderInner}}>
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}