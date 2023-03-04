"use client";
import style from './page.module.css'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Pagination } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Image from 'next/image';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const inter = Inter({ subsets: ['latin'] })
const theme = createTheme({
  palette: {
    primary: {
      light: '#FFFFFF',
      main: '#FFFFFF',
      dark: '#FFFFFF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function Header1() {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
      <AppBar position="static" style={{ background: 'black', maxWidth: '93vw' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TBD//Not logged
          </Typography>
          <Button color="inherit"><Link href='/auth/signin'>Авторизація</Link></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
function Header2() {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
      <AppBar position="static" style={{ background: 'black', maxWidth: '93vw' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TBD//Logged
          </Typography>
          <IconButton aria-label="cart">
            <Badge badgeContent={4} color="primary" style={{ color: 'white', marginRight: '10px' }}>
              <NotificationsIcon color="inherit" />
            </Badge>
          </IconButton>
          <Link href='/user/you'>
            <Avatar alt="Remy Sharp" src="https://imgs.search.brave.com/f2iI8pGpAjB5e0NXj2jKHhpoxaQntZRUe5v0qhBSJFU/rs:fit:250:250:1/g:ce/aHR0cHM6Ly93d3cu/YXBleC1tb3Rvci5j/by56YS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8xMC90ZXN0/LWF2YXRhci5wbmc" />
          </Link>
          <Link href='/join'>
            <IconButton aria-label="cart">
              <PlayCircleFilledIcon color="inherit" style={{ color: 'white' }} />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


// async function getData(){
//   return await (await fetch('https://jsonplaceholder.typicode.com/users/1')).json()
// }

export default function Home() {

  // const hello = use(getData())

  return (
    <main>
      <Header1 />
      <Header2 />
      <div className={style.mainContent}>
        <div className={style.heroTypographyOne}>
          diplomatych
        </div>
        <div className={style.heroTypographyTwo}>
          new era
        </div>
      </div>

      <div className={style.gridContainer}>
        <div className={style.gridBlock}>
          <div className={style.flexNews}>
            <div><h1>НОВИНИ</h1></div>
            <Card sx={{ maxWidth: 700, background: 'black', color: 'white' }}>
              <CardActionArea sx={{ padding: 5 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Новина №1
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://cdn.discordapp.com/attachments/981424177644970034/981638628734296084/Untitled43_20220519005839-1.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography variant="body2" color="text.primary" sx={{ color: 'white' }}>
                    Короткий опис тексту який міститься у цій новині аби звабити людей клікнути на новину.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 700, background: 'black', color: 'white' }}>
              <CardActionArea sx={{ padding: 5 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Новина №2
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://cdn.discordapp.com/attachments/981424177644970034/981638628734296084/Untitled43_20220519005839-1.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography variant="body2" color="text.primary" sx={{ color: 'white' }}>
                    Короткий опис тексту який міститься у цій новині аби звабити людей клікнути на новину.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 700, background: 'black', color: 'white' }}>
              <CardActionArea sx={{ padding: 5 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Новина №3
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://cdn.discordapp.com/attachments/981424177644970034/981638628734296084/Untitled43_20220519005839-1.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography variant="body2" color="text.primary" sx={{ color: 'white' }}>
                    Короткий опис тексту який міститься у цій новині аби звабити людей клікнути на новину.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 700, background: 'black', color: 'white' }}>
              <CardActionArea sx={{ padding: 5 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Новина №4
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://cdn.discordapp.com/attachments/981424177644970034/981638628734296084/Untitled43_20220519005839-1.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography variant="body2" color="text.primary" sx={{ color: 'white' }}>
                    Короткий опис тексту який міститься у цій новині аби звабити людей клікнути на новину.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 700, background: 'black', color: 'white' }}>
              <CardActionArea sx={{ padding: 5 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Новина №5
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://cdn.discordapp.com/attachments/981424177644970034/981638628734296084/Untitled43_20220519005839-1.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography variant="body2" color="text.primary" sx={{ color: 'white' }}>
                    Короткий опис тексту який міститься у цій новині аби звабити людей клікнути на новину.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
          <div className={style.flexEvents}>
            <div><h1>ІВЕНТИ</h1></div>
            <Card sx={{ maxWidth: 700, background: 'black', color: 'white' }}>
              <CardActionArea sx={{ padding: 5 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Перший бета тест Дипломатичу!
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://cdn.discordapp.com/attachments/981424177644970034/981638628734296084/Untitled43_20220519005839-1.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography variant="body2" color="text.primary" sx={{ color: 'white' }}>
                    Зацікавлен?
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>
      </div>
      <Pagination count={10} size="large" color='primary' sx={{ margin: '40px auto' }} style={{ fill: 'white' }} />
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ width: '500px', textAlign: 'center' }}>
          Тут має бути підвал сторінки, з інформацією про нас, адресами, контактними особами, соц мережами і тд.
        </div>
      </div>
    </main>
  )
}
