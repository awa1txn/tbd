import { useRouter } from 'next/router';
import style from './user.module.css'

const Profile = () =>{
    const router = useRouter();
    const { id } = router.query;
    

    return <p className={style.card}>user: {id}</p>
}

export default Profile