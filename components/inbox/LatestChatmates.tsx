import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Link, router } from 'expo-router'
import { LatestChatmatesProps } from '@/types/props/MessagesProps';
import { parseToTime } from '@/utils/parseToTime';

export default function LatestChatmates({ data, inboxData, isLoading }: LatestChatmatesProps) {
    
    if(!isLoading){
        return <TempData data={data} /> // will change to skeleton loading
    }
    
    if(inboxData.length === 0){
        return (
            <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={{color: 'white', fontSize: 20}}>
                    No messages yet
                </Text>
            </View>
        )
    }

    return (
        <View>
            {inboxData.map((chat) => (
                <TouchableOpacity // touchable for user experience
                    key={chat.name}
                    style={{marginBottom: 12, marginTop: 12}}
                    onPress={() => {
                        router.push({
                            pathname: chat.type === 'direct' ? "/user-chat/[id]" : "/group-chat/[id]",
                            params: {
                                id: chat.id,
                                name: chat.name,
                                profile: chat.image,
                            }
                        });
                    }}
                >
                    <View style={styles.latestChatmates}>
                        <Image 
                            source={{uri: chat.image}} 
                            style={styles.profile}
                        />
                        <View style={{ flexDirection: 'column', gap: 3 }}>
                            <Text style={{ color: 'white', fontSize: 15}}>
                                {chat.name}
                            </Text>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                {chat.lastMessageContent ? (
                                    <Text style={[
                                        styles.latestMessage, {
                                            color: chat.isRead ? 'grey' : 'white'
                                            }
                                        ]
                                    }>
                                        {
                                            chat.isSender ? 'You: ' : 
                                            chat.type === 'group' ? chat.sentByName + ': ' : ''
                                        }
                                        {chat.lastMessageContent}
                                    </Text>
                                ):(
                                    <Text style={styles.latestMessage}>
                                        Created the group
                                    </Text>
                                )}
                                <Text style={styles.latestMessage}>
                                    |  {parseToTime(chat.lastMessageSent)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

type Props = {
    data: { //test data
        id: number;
        name: string;
        type: string;
    }[];
}

function TempData({ data }: Props) {
    return (
        data.map((chat) => (
            <Link key={chat.id}
                href={{
                    pathname: "/group-chat/[id]",
                    params: chat
                }}
                style={{marginBottom: 12, marginTop: 12}}
            >
                <View style={styles.latestChatmates}>
                    <Image source={{
                            uri: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                        }} 
                        style={{
                            width: 60, 
                            height: 60, 
                            borderRadius: 50, 
                            backgroundColor: 'white'
                        }}
                    />
                    <View>
                    <Text style={{ color: 'white', fontSize: 15 }}>
                        {chat.name}
                    </Text>
                    <View style={{flexDirection: 'row', gap: 5}}>
                        <Text style={{color: 'grey', fontSize: 12}}>
                            You: {chat.type}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 12}}>
                            |  2:53 PM
                        </Text>
                    </View>
                    </View>
                </View>
            </Link>
        ))
  )
}


const styles = StyleSheet.create({
    latestChatmates: {
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    profile:{
        width: 60, 
        height: 60, 
        borderRadius: 50, 
        backgroundColor: 'white'
    },
    latestMessage: {
        color: 'grey',
        fontSize: 12
    }
})