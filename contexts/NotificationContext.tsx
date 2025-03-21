import React, { 
    createContext, 
    useContext, 
    useEffect, 
    useState 
} from "react"

type NotificationTypes = {
    id: number,
    notif_to_id: number,
    notif_from_id: number,
    message: string
    type: string,
    redirect_link: string,
    is_read: boolean,
    notified_at: Date
}

export interface NotificationContextType {
    notifications: NotificationTypes[],
    setNotification: React.Dispatch<React.SetStateAction<NotificationTypes[]>>,
    readNotification: (notif_id: number) => Promise<void>,
    deleteAllNotification: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType>({
    notifications: [],
    setNotification: () => {},
    readNotification: async () => {},
    deleteAllNotification: async () => {}
});

export function NotificationProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    // const { userId } = GetUserContext
    const userId = 1;

    const [notifications, setNotification] = useState<NotificationTypes[]>([])

    useEffect(() =>{
        console.log(userId, "userID")
    },[])
 
    const readNotification = async (notif_id: number) =>{
        console.log(notif_id)
    }

    const deleteAllNotification = async () =>{
        console.log(userId)
    }

    return (
        <NotificationContext.Provider 
            value={{
                notifications,
                setNotification,
                readNotification,
                deleteAllNotification
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotificationContext() {
    const context = useContext(NotificationContext);
    return context;
}