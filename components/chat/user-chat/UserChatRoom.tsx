import { View, StyleSheet, ScrollView } from "react-native";
import { useChatRoom } from "@/hooks/useChatRoom";
import { ChatParams } from "@/types/params/ChatParams";
import { ChatmateType, Messages } from "@/types/entities/InboxEntity";
import { useAuth } from "@/context/auth-context";
import TestChats from "../TestChats";
import RoomInputForm from "../RoomInputForm";
import RoomMessages from "../RoomMessages";
import { isTimeExceeds30mins } from "@/utils/time";
import { useEffect, useRef } from "react";

type UserChatRoomProps = {
  roomData: ChatmateType;
  paramsData: ChatParams;
  loading: boolean;
  setRoomData: React.Dispatch<React.SetStateAction<ChatmateType>>;
};

export default function UserChatRoom({
  roomData,
  paramsData,
  loading,
  setRoomData,
}: UserChatRoomProps) {

  const { id: userId, username, profile } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  
  const propsCR = {
    room_id: Number(paramsData.id),
    sender_id: userId,
    username,
    profile,
    room_type: "user-chat",
    room_name: "direct",
  };

  const {
    inputMessage,
    setInputMessage,
    image,
    pickImage,
    uploadImage,
    wsConnection,
    roomMessages: directMessages,
    setLoading,
    loading: sendMessageLoading,
    setImage
  } = useChatRoom(propsCR);

  const inputFormProps = {
    pickImage,
    setInputMessage,
    inputMessage,
    wsConnection,
    image,
    uploadImage,
    setLoading,
    sentTo: paramsData.sentTo,
    setImage,
  };
  
  useEffect(() => {
    if(loading) return;
    scrollViewRef.current?.scrollToEnd({animated: false});
  }, [loading]);

  useEffect(() => {
    if (directMessages === undefined) return;
    setRoomData((data) => {
      return {
        ...data,
        messages: [...(data.messages || []), directMessages]
      }
    })
  }, [directMessages, setRoomData]);

  const viewMessages = () => {
    console.log(roomData, "ROOM DATA");
    const chatmate = roomData.member1.user_id === userId
      ? roomData.member2
      : roomData.member1;

    return roomData.messages.map((message: Messages, index: number) => (
      <RoomMessages
        key={index}
        message={message}
        userId={userId}
        index={index}
        sender_name={chatmate.first_name + " " + chatmate.last_name}
        type="uc"
        lastMessage={index === roomData?.messages.length - 1}
        loading={sendMessageLoading}
        isExceeds={isTimeExceeds30mins(
          roomData.messages[index].sent_at,
          roomData.messages[index - 1]?.sent_at
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
            if(directMessages !== undefined && directMessages.sender_id === userId){
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
