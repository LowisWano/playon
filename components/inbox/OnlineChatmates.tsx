import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { Link } from 'expo-router'
import { LatestChatmatesProps } from '@/types/props/MessagesProps'

export default function OnlineChatmates({ data, inboxData, isLoading }: LatestChatmatesProps) {
    
    if(isLoading){
        return <TestData data={data} /> // will change to skeleton loading
    }

    if(inboxData.length === 0){ 
        return <></> // LatestChatmate Component will handle it (both are dependent)
    }
    
    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ width: '100%', maxHeight: 100}}
            contentContainerStyle={{ paddingVertical: 10 }}
        >
            {inboxData.map((chat) =>(
                <Link key={chat.name}
                    href={{
                        pathname: chat.type === 'direct' ? "/user-chat/[id]" : "/group-chat/[id]",
                        params: {
                            id: chat.id,
                            name: chat.name,
                            profile: chat.image,
                            room_id: chat.room_id,
                        }
                    }}
                    style={{ marginBottom: 12, marginTop: 12 }}
                >
                    <View style={styles.onlineChatmates}>
                        <Image 
                            source={{ uri: chat.image }} 
                            style={styles.chatmateImage}
                        />
                        <Text style={{color: 'white', fontSize: 10}}>
                            {chat.name.length > 10 ? chat.name.slice(0, 7) + '..' : chat.name}
                        </Text>
                    </View>
                </Link>
            ))}
    </ScrollView>
  )
}


type Props = {
    data: { //test data
        id: number;
        name: string;
        type: string;
    }[];
}

function TestData ({ data } : Props) {
    return (
        <>
        {data.map((chat) => (
            <Link key={chat.id}
                href={{
                    pathname: "/group-chat/[id]",
                    params: chat
                }}
                >
                <View style={styles.onlineChatmates}>
                    <Image source={{
                            uri: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                        }} 
                        style={{
                            width: 40, 
                            height: 40, 
                            borderRadius: 50, 
                            backgroundColor: 'white'
                        }}
                    />
                    <Text style={{
                        color: 'white', 
                        fontSize: 10
                    }}
                    >
                    {chat.name.length > 10 ? chat.name.slice(0, 7) + '..' : chat.name}
                    </Text>
                </View>
            </Link>
        ))}
        </>
    )
}

const styles = StyleSheet.create({
    onlineChatmates: {
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 68,
        gap: 5,
    },
    chatmateImage:{
        width: 40, 
        height: 40, 
        borderRadius: 50, 
        backgroundColor: 'white'
    }
})