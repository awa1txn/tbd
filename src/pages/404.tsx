import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()
  return <h1 style={{
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    height: '400px'
  }}>
    <p onClick={() => { router.push('/') }}>Тицяй на цей текст щоб потрапити на головну, сталкер.</p>
  </h1>
}