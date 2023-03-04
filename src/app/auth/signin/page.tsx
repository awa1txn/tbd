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
import { Input } from '@mui/material';


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



function BoxAppBar() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" style={{ background: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{textOverflow: "ellipsis"}}>
            Вхід до особистого профілю
          </Typography>
          <Link href='/'>НА ГОЛОВНУ</Link>
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
        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Логін</InputLabel>
          <Input
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
          <Input
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </Box>
    </ThemeProvider>
    )
}
export default function Page() {
  return <main>
  <BoxAppBar/>
  <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height:'500px',
  flexDirection: 'column'
}}>
  <SignIn/>
  <div style={{
    margin: '20px 0px'
  }}>
    <p>Немає особистого профілю?</p>
    <p> <Link href='auth/signup'><u>Зареєструйся</u></Link> </p>
  </div>
      <Button variant="contained" style={{
        width: '20ch',
        margin: '10px 0px'
      }}
      
      >Увійти</Button>
  </div>
  </main>
}