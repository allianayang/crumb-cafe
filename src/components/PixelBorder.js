import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';


export default function PixelBorder({children, theme}) {

  const pixelBorderOuter = {
    border: `2px solid ${theme.palette.primary.dark}`,
    justifyContent: 'center',
    alignItems: 'center'
  }

  const pixelBorder = {
    border: `3px solid ${theme.palette.primary.main}`,
    boxShadow: `1px 0 0 ${theme.palette.primary.main}, -1px 0 0 ${theme.palette.primary.main}, 0 1px 0 ${theme.palette.primary.main}, 0 -1px 0 ${theme.palette.primary.main}`,
    m: 0.14,
    justifyContent: 'center',
    alignItems: 'center'
  }

  const pixelBorderInner = {
    border: `.5px solid ${theme.palette.primary.dark}`,
    boxShadow: `1.5px 0 0 ${theme.palette.primary.dark}, -1.5px 0 0 ${theme.palette.primary.dark}, 0 1.5px 0 ${theme.palette.primary.dark}, 0 -1.5px 0 ${theme.palette.primary.dark}`,
    justifyContent: 'center',
    alignItems: 'center'
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