import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export const session = {
    aT: undefined
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID ?? '',
            clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
            authorization: {
                params: {
                    scope: 'identify email'
                }
            },
            userinfo: {
                params: { 
                    scope: 'identify email'
                }
              }
        }),
        // ...add more providers here 
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
              return true
            } else {
              // Return false to display a default error message
              return false
              // Or you can return a URL to redirect to:
              // return '/unauthorized'
            }
        },
        async session({ session, token, user }) {
            session.accessToken = token.access_token
            return session;
        },
        async jwt({ token, account }){
            if (account){
            token.accessToken = account.access_token
            session.aT = token.accessToken;
            }
            return token;
        }
    },

}

export default NextAuth(authOptions)