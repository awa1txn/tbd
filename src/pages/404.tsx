import Link from 'next/link'

export default function Custom404() {
    return <h1 style={{
       display: 'flex',
       justifyContent: "center",
       alignItems:'center', 
       height: '400px'
      }}>
        Брат вертайся на - <Link href="/"><span>*головну*</span></Link>, бо тут тебе не очікували.
        </h1>
  }