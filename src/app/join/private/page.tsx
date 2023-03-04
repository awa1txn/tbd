"use client"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Box, ThemeProvider} from '@mui/system';
import {createTheme} from '@mui/material/styles'
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



  function Header2() {
    return (
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent:'center'}}>
        <AppBar position="static" style={{ background: 'black' , maxWidth: '93vw'}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href='/join'>Публічні ігри</Link>/<u>Приватні ігри</u>
            </Typography>
            <IconButton aria-label="cart">
            <Badge badgeContent={4} color="primary" style={{color:'white', marginRight:'10px'}}>
              <NotificationsIcon color="inherit" />
            </Badge>
            </IconButton>
            <Link href='/user/you'>
            <Avatar alt="Remy Sharp" src="https://imgs.search.brave.com/f2iI8pGpAjB5e0NXj2jKHhpoxaQntZRUe5v0qhBSJFU/rs:fit:250:250:1/g:ce/aHR0cHM6Ly93d3cu/YXBleC1tb3Rvci5j/by56YS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8xMC90ZXN0/LWF2YXRhci5wbmc" />
            </Link>
            <Link href='/'>
            <IconButton aria-label="cart">
              <HomeIcon color="inherit" style={{color:'white'}} />
            </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

function SignIn() {
    let [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };

    return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection:'column'}}>
    <div>
        <FormControl sx={{ m: 1, width: '30ch' }} variant="filled">
          <InputLabel htmlFor="outlined-adornment-password">Ключ гри</InputLabel>
          <Input
          />
        </FormControl>
      </div>
    </Box>
    </ThemeProvider>
    )
}
export default function Page() {
  return <main>
  <Header2/>
  <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height:'500px',
  flexDirection: 'column'
}}>
  <SignIn/>
      <Button variant="contained" style={{
        width: '20ch',
        margin: '10px 0px'
      }}
      
      >Увійти</Button>
  </div>
  </main>
}