"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  roomName: string,
  players: number,
) {
  return { roomName, players};
}

const rows = [
  createData('Frozen yoghurt', 9),
  createData('Ice cream sandwich', 37),
  createData('Eclair', 62),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
].sort((a,b)=> a.players > b.players ? -1 : 1);
function Header1() {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent:'center'}}>
      <AppBar position="static" style={{ background: 'black' , maxWidth: '93vw'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <u>Публічні ігри</u>/ <Link href='/join/private'>Приватні ігри</Link>
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
function Header2() {
    return (
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent:'center'}}>
        <AppBar position="static" style={{ background: 'black' , maxWidth: '93vw'}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <u>Публічні ігри</u>/ <Link href='/join/private'>Приватні ігри</Link>
            </Typography>
            <IconButton aria-label="cart">
            <Link href='/host'>
              <AddBoxIcon color="inherit" style={{color:'white'}} />
            </Link>
            </IconButton>
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
export default function Page() {
  return (<>
    <Header1 />
    <Header2 />
    <TableContainer component={Paper} sx={{background: 'black'}}>
      <Table sx={{ width: 700, margin: '0 auto', background: 'white'}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Назва кімнати</StyledTableCell>
            <StyledTableCell align="center">Кількість гравців</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.roomName}>

              <StyledTableCell align="left"><Link href={`/rooms/${1}`}>{row.roomName}</Link></StyledTableCell>
              <StyledTableCell align="center">{row.players}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
}