import { createContext, useContext } from "react"

type User = {
    email: string,
    image: string,
    name: string
}
export type UserData = {
    expires: any,
    user: {
        [key: string]: User
    }
} | null;

type AuthType = {
    userData: UserData
    setUserData: (userData: UserData) => void
}

export const AuthContext = createContext<AuthType>({
    userData: null,
    setUserData: () => { }
})

export function useAuthContext() {
    return useContext(AuthContext)
}