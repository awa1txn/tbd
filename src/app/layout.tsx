"use client";
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import LogoutIcon from '@mui/icons-material/Logout';
import { getSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import './globals.css'
import { usePathname, useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AuthContext, useAuthContext } from '@/services/contexts/auth/authContext';
import { UserData } from '@/services/contexts/auth/authContext';


//MAKE USER AUtH FOR AWS DB WItH ID MAIL ROLE timestamps

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

function Splashscreen() {
  React.useEffect(() => {
    setTimeout(() => {
      document.getElementById('globalLoader')?.setAttribute('style', `
      position: fixed;
      z-index: 9999;
      top: 50%;
      left: 50%;
      background-color: #000;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      display: flex;
      animation: splashscreen 1s;
      flex-direction: column-reverse`)
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          const loader = document.getElementById('globalLoader');
          if (loader)
            loader.remove();
        }
      }, 900);
    }, 2000);
  }, []);
  return <>
    <div id='globalLoader' style={{
      position: 'fixed',
      zIndex: 9999,
      top: "50%",
      left: "50%",
      background: '#000',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column-reverse'
    }}>
      <img src="https://cdn.discordapp.com/attachments/941380040195715132/991438405445615747/IMG_20220628_232153.jpg" height={'70%'} alt="" />
      <p>made by Sexmachine</p>
    </div>
  </>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const path = usePathname();
  const isHome = path === '/';
  const [userData, setUserData] = React.useState<UserData>(null)
  const [isLoading, setIsLoading] = React.useState(isHome)
  //useEffects
  React.useEffect(() => {
    //functions gets data of user session and sets to state
    (async function UserSession() {
      const session: any = await getSession();
      // UserSign(session)
      setUserData(session)
    })()
    setTimeout(() => {
      setIsLoading(false)
    }, 4000);
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
          <Splashscreen />
          <Header />
          {children}
        </AuthContext.Provider>
      </body>
    </html>
  )
}
