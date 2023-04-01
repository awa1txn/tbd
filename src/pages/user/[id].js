"use client";
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image'
import style from './user.module.css'


export default function Page() {
    const router = useRouter();
    const { id } = router.query;
    const [userData, setUserData] = React.useState([]);

    React.useEffect(()=>{
            (async function user() {
                const body = id;
   
                const res = fetch('http://localhost:3000/api/auth/sign',
                    {
                        method: "POST",
                        cache: 'force-cache',
                        body
                    })
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (json) {
                        // console.log(json);
                        setUserData(json)
                    })
            })()
    }, [id])
    return (
        <>
            user page
                <ul>
                    <li>
                        id:{userData.id}
                    </li>
                    <li>
                        avatar image uri:{userData.image}
                    </li>
                    <li>
                        mail:{userData.email}
                    </li>
                    <li>
                        roleLVL:{userData.role}
                    </li>
                </ul>
            <Image src={userData.image ?? 'https://imgs.search.brave.com/WXOcrQtv7vqv7kBbWX1VWRCCfW6u9gXYv6eKryV7_P4/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/d3BmYXN0ZXIub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEz/LzA2L2xvYWRpbmct/Z2lmLmdpZg.gif'} width={200} height={200} alt='avatar' />
            {/* {
                user === 'not found' ? <div className={style.card}> Нажаль наша базаданих або не бачить цього юзера, або його покарав банхамер.Хі-хі-ха-ха.</div> :
                    <div className={style.card}>
                        <Image src={`${user.image || 'https://imgs.search.brave.com/WXOcrQtv7vqv7kBbWX1VWRCCfW6u9gXYv6eKryV7_P4/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/d3BmYXN0ZXIub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEz/LzA2L2xvYWRpbmct/Z2lmLmdpZg.gif'}`} alt={'userImage'} width={200} height={200}></Image>
                        <div>
                            id: {user.id}
                        </div>
                        <div>
                            role: {
                                user.role === 0 ? 'default' : user.role === 1 ? 'moderator' : 'admin'
                            }
                        </div>
                        <div>
                            full reg date: {user.createdAt}
                        </div>
                    </div>
            } */}
        </>
    )

}
