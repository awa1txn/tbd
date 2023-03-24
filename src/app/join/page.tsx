"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/services/contexts/auth/authContext'

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
  return { roomName, players };
}

const rows = [
  createData('Frozen yoghurt', 9),
  createData('Ice cream sandwich', 37),
  createData('Eclair', 62),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
].sort((a, b) => a.players > b.players ? -1 : 1);

type User = {
  email: string,
  image: string,
  name: string
}
type UserData = {
  expires: any,
  user: {
    [key: string]: User
  }
}

export default function Page() {
  // const router = useRouter()
  // const AuthContext = useAuthContext().userData.user
  // const isAuth = Object.keys(AuthContext).length != 0
  // if (!isAuth) {
  //   router.push('/')
  // }

  return (<>
    {/* <TableContainer component={Paper} sx={{ background: 'black' }}>
      <Table sx={{ width: 700, margin: '0 auto', background: 'white' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Назва кімнати</StyledTableCell>
            <StyledTableCell align="center">Кількість гравців</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, id) => (
            <StyledTableRow>
              <StyledTableCell align="left"><Link href={`/rooms/${1}`} key={id}>{row.roomName}</Link></StyledTableCell>
              <StyledTableCell align="center" key={id}>{row.players}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
    Bro we have some work to do. Wait for it! If you need to check previous games, watch for existing links.
  </>
  );
}