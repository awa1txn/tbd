"use client"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import React from 'react';
import { Avatar, Badge, Input } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';


const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: 'white',
      secondary: 'dark',
    },
    action: {
      active: '#001E3C',
    },

  },
});

export default function Page() {
  const router = useRouter();
  const [gameKey, setGameKey] = React.useState<string | null>(null);


  return <main>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '500px',
      flexDirection: 'column'
    }}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
          <div>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="filled">
              <InputLabel htmlFor="outlined-adornment-password">Ключ гри</InputLabel>
              <Input
                onChange={(e) => { setGameKey(e.target.value) }}
              />
            </FormControl>
          </div>
        </Box>
      </ThemeProvider>
      <Link href={`http://localhost:3000/rooms/${gameKey}`} passHref>
        <Button variant="contained" style={{
          width: '20ch',
          margin: '10px 0px'
        }}
        >Увійти</Button>
      </Link>
    </div>
  </main>
}