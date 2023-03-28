import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image'
import style from './user.module.css'

const Profile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = React.useState<any>({});

    if (Object.keys(user).length === 0) {
        (async function user() {
            const body: any = id;

            const res = fetch('/api/auth/sign',
                {
                    method: "POST",
                    body
                })
                .then(function (response) {
                    return response.json()
                })
                .then(function (json) {
                    console.log(json);
                    setUser(json)
                })
        })()
    }

    return (
        <>
            {
                user === 'not found' ? <div className={style.card}> Нажаль наша базаданих або не бачить цього юзера, або його покарав банхамер.Хі-хі-ха-ха.</div> :
                    <div className={style.card}>
                        <Image src={`${user.image || 'https://imgs.search.brave.com/WXOcrQtv7vqv7kBbWX1VWRCCfW6u9gXYv6eKryV7_P4/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/d3BmYXN0ZXIub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEz/LzA2L2xvYWRpbmct/Z2lmLmdpZg.gif'}`} alt={'userImage'} width={200} height={200}></Image>
                        {/* <div>
                user email: {user.email}
            </div> */}
                        <div>
                            your id: {user.id}
                        </div>
                        <div>
                            your role: {
                                user.role === 0 ? 'default' : user.role === 1 ? 'moderator' : 'admin'
                            }
                        </div>
                        <div>
                            reg date: {user.createdAt}
                        </div>
                    </div>
            }
        </>
    )

}

export default Profile