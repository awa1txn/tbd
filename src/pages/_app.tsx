import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session} refetchInterval={5 * 60}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}