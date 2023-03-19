"use client";
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import LogoutIcon from '@mui/icons-material/Logout';
import { getSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { createContext, useContext, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import './globals.css'
import { usePathname, useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';

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

type AuthType = {
  userData: UserData
  setUserData: (userData: UserData) => void
}

const AuthContext = createContext<AuthType>({
  userData: { expires: '', user: {} },
  setUserData: () => { }
})

export function useAuthContext() {
  return useContext(AuthContext)
}

function Header() {
  // shows user path (inner pages) /join e.g.
  // const pathName = window.location.pathname;
  // console.log(window.location.pathname)

  //states
  const path = usePathname();
  const userData = useAuthContext().userData
  const mainPath = path === '/'
  const joinPath = path === '/join'
  const privatePath = path === '/join/private'

  //functions
  // function UserSign(data: UserData): void {
  //   fetch('http://localhost:3000/api/auth/sign',
  //     {
  //       method: 'POST',
  //       headers: { 'Content': 'application/json' },
  //       body: JSON.stringify(data)
  //     }
  //   )
  // }

  return <>
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
      <AppBar position="static" style={{ background: 'black', maxWidth: '93vw' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {mainPath && <>TBD</>}
            {joinPath && <><u>Публічні ігри</u>/ <Link href='/join/private'>Приватні ігри</Link></>}
            {privatePath && <><Link href='/join'>Публічні ігри</Link>/<u>Приватні ігри</u></>}
          </Typography>
          {
            !userData &&
            <>
              <Button color="inherit" onClick={() => { signIn() }}><Link href=''>Авторизація</Link></Button>
            </>
          }
          {
            userData &&
            <>
              <IconButton aria-label="cart">
                <Link href='/host'>
                  <AddBoxIcon color="inherit" style={{ color: 'white' }} />
                </Link>
              </IconButton>
              <Link href='/user/you'>
                {
                  Object.keys(userData.user).length === 0 &&
                  <ColorRing
                    visible={true}
                    height="50"
                    width="40"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#fff', '#B2A3B5', '#fff', '#51E5FF', '#fff']}
                  />
                }
                {
                  Object.keys(userData.user).length != 0 &&
                  <Avatar alt="Remy Sharp" src={`${userData.user.image}`} />
                }
              </Link>
              {
                mainPath &&
                <>
                  <Link href='/join'>
                    <IconButton aria-label="cart">
                      <PlayCircleFilledIcon color="inherit" style={{ color: 'white' }} />
                    </IconButton>
                  </Link>
                </>
              }
              {
                !mainPath &&
                <>
                  <Link href='/'>
                    <IconButton aria-label="cart">
                      <HomeIcon color="inherit" style={{ color: 'white' }} />
                    </IconButton>
                  </Link>
                </>
              }

              <span onClick={() => { signOut() }}>
                <IconButton aria-label="cart">
                  <LogoutIcon color="inherit" style={{ color: 'white' }} />
                </IconButton>
              </span>
            </>
          }

        </Toolbar>
      </AppBar>
    </Box>
  </>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const [userData, setUserData] = React.useState<UserData>({ expires: '', user: {} })
  const router = useRouter();
  //useEffects
  React.useEffect(() => {
    //functions gets data of user session and sets to state
    (async function UserSession() {
      const session: any = await getSession();
      // UserSign(session)
      setUserData(session)
    })()
  }, [])
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthContext.Provider value={{ userData, setUserData }}>
          <Header />
          {children}
        </AuthContext.Provider>
      </body>
    </html>
  )
}
