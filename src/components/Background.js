/** @jsxImportSource @emotion/react */
import sky from '../assets/Clouds2/1.png';
import cloud from '../assets/Clouds2/3.png';
import cloud2 from '../assets/Clouds2/4.png';
import { keyframes } from '@emotion/react';
import { Paper, Box} from '@mui/material';

const drift = keyframes`
  0% { left: 100%; }
  100% { left: -90%; }
`;

const scroll = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;
export default function Background({children}) {

  return (
    <Paper style={{
      backgroundImage: `url(${sky})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '20px',
      margin: 'auto', 
      maxWidth: '600px',
      textAlign: 'center', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
       height: '490px',
      zIndex: 0
    }}>
        <Box
          css={{
            position: 'absolute',
            display: 'flex',
            height: '100%',
            width: '200%',         // 2x width to allow seamless scroll
            animation: `${scroll} 50s linear infinite`,
            zIndex: -1,
          }}
        >
          <img src={cloud} alt="background" style={{width: '100%', objectFit: 'cover' }} />
          <img src={cloud} alt="background copy" style={{width: '100%', objectFit: 'cover' }} />
        </Box>
        <img
        src={cloud2}
        css={{
          position: 'absolute',
          height: '100%',
          animation: `${drift} 60s linear infinite`,
          zIndex: -1
        }}
      />
        <Box sx={{zIndex: 10}}>
        {children}
        </Box>
    </Paper>
  )
}