import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useChatRoom } from "@/hooks/useChatRoom";
import { useAuth } from "@/context/auth-context";
import TestChats from "../TestChats";
import { GroupChatType, Messages } from "@/types/entities/InboxEntity";
import { ChatParams } from "@/types/params/ChatParams";
import RoomInputForm from "../RoomInputForm";
import RoomMessages from "../RoomMessages";
import { isTimeExceeds30mins } from "@/utils/time";
import { useEffect, useRef } from "react";

type GroupChatRoomProps = {
  roomData: GroupChatType;
  paramsData: ChatParams;
  loading: boolean;
  setRoomData: React.Dispatch<React.SetStateAction<GroupChatType>>;
};

export default function GroupChatRoom({
  roomData,
  paramsData,
  loading,
  setRoomData,
}: GroupChatRoomProps) {
  const { id: userId, username, profile } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);

  const propsCR = {
    room_id: Number(paramsData.id),
    sender_id: userId,
    username,
    profile,
    room_type: "group-chat",
    room_name: paramsData.name,
  };

  const {
    inputMessage,
    setInputMessage,
    image,
    pickImage,
    uploadImage,
    wsConnection,
    roomMessages: gcMessages,
    loading: sendMessageLoading,
    setLoading,
    setImage,
  } = useChatRoom(propsCR);

  const inputFormProps = {
    pickImage,
    setInputMessage,
    inputMessage,
    wsConnection,
    image,
    uploadImage,
    setLoading,
    sentTo : paramsData.name,
    setImage,
  };

  useEffect(() => {
    if (gcMessages === undefined) return;
    setRoomData((data) => {
      return {
        ...data,
        messages: [...(data.messages || []), gcMessages]
      }
    })
  }, [gcMessages, setRoomData]);

  console.log(roomData, "ROOM DATA");
  // const lastUserSeen = () =>

  const findSender = (sender_id: number) : string => {
    const user = roomData.group_users.find((member) => member.user_id === sender_id)?.user;
    if (user === undefined) return "Unknown User"; // impossible to happen
    return user.first_name + " " + user.last_name;
  };

  const viewMessages = () => {
    console.log(roomData, "ROOM DATA");
    if(roomData.messages === null) {
      return <Text>No messages yet</Text>
    };
    return roomData.messages.map((message: Messages, index: number) => (
      <RoomMessages
        key={index}
        message={message}
        userId={userId}
        index={index}
        sender_name={findSender(message.sender_id)}
        type="gc"
        lastMessage={index === roomData.messages.length - 1}
        loading={sendMessageLoading}
        isExceeds={isTimeExceeds30mins(
          roomData.messages[index].sent_at,
          roomData.messages[index - 1]?.sent_at || null
        )}
        isStillSender={
          roomData.messages[index].sender_id === 
          roomData.messages[index + 1]?.sender_id         
        }
      />
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={{ flex: 1 }} 
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          // prevent the scroll to bottom if the user is not the sender
          if(gcMessages !== undefined && gcMessages.sender_id === userId){
            scrollViewRef.current?.scrollToEnd({animated: true})
          }
        }}
      >
        {loading ? (
          <TestChats /> // Test, will replace to loading
        ) : (
          viewMessages()
        )}
      </ScrollView>
      <RoomInputForm {...inputFormProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingLeft: 25,
    paddingRight: 25,
  },
});
