"use client";
import style from './page.module.css'
import { Inter } from '@next/font/google'
import React from 'react';
import { createTheme } from '@mui/material/styles';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { session } from '../pages/api/auth/[...nextauth]'
import axios from 'axios'
import cookies from 'next-cookies'
//import { signIn, signOut, getSession, useSession } from "next-auth/react"

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


export default function Home() {
  return (
    <main>
      {/* hero content */}
      <div className={style.mainContent}>
        <div className={style.heroTypographyOne}>
          diplomatych
        </div>
        <div className={style.heroTypographyTwo}>
          new era
        </div>
      </div>
      {/* news */}
      <div className={style.gridContainer}>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{ height: 2400, width: 900 }}
        />
      </div>
      {/* footer */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ width: '500px', textAlign: 'center' }}>
          Тут має бути підвал сторінки, з інформацією про нас, адресами, контактними особами, соц мережами і тд.
        </div>
      </div>
    </main>
  )
}
