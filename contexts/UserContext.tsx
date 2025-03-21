import React, { 
    createContext, 
    useContext, 
    useEffect, 
} from "react"


export interface UserContextType {
    userId: number,
    username: string,
    profile: string,
}

const UserContext = createContext<UserContextType>({
    userId: 0,
    username: "",
    profile: "",
});

export function UserProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const userId = 1;
    const username = "testname";
    const profile = "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";

    useEffect(() =>{
        console.log(userId, "userID")
    },[])
 
 
    return (
        <UserContext.Provider 
            value={{
                userId,
                username,
                profile,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext);
    return context;
}