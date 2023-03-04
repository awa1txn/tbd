import { CardMedia } from '@mui/material';
import { useRouter } from 'next/router';
import style from './user.module.css'

const Profile = () =>{
    const router = useRouter();
    const { id } = router.query;
    

    return <div>
    <main>
    <div className={style.card}>
        <CardMedia
                component="img"
                height="140"
                image="https://www.w3schools.com/w3images/team2.jpg"
                alt="green iguana"
            />
        <h1 className={style.titleName}>SAN40 ✙</h1>
        <p className={style.discordTag}>SAN40 ✙#6116</p>
        <p className={style.role}>Засновник проекту</p>
    </div>
    </main>
    </div>
}
export default Profile