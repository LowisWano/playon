import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ChatParams } from "@/types/params/ChatParams";
import UserChatRoom from "@/components/chat/user-chat/UserChatRoom";
import { ChatService } from "@/services/chat.service";
import { ChatmateType } from "@/types/entities/InboxEntity";
import { useAuth } from "@/context/auth-context";

export default function UserChatScreen() {
  const { id } = useAuth();
  const params = useLocalSearchParams() as ChatParams;
  const [roomData, setRoomData] = useState<ChatmateType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsersDirectChat = async () => {
      try {
        const data = await ChatService.getDirectMessages(Number(params.id));
        setRoomData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadUsersDirectChat();
  }, [params.id]);

  // when load, read all messages in the room
  useEffect(() => {
    const readAllMessagesInRoom = async () => {
      if (roomData) {
        try {
          roomData.messages.forEach(async (message) => {
            if (message.sender_id !== id) {
              if (
                message.read_messages.length !== 0 &&
                message.read_messages[0].is_read === false
              ) {
                await ChatService.readMessage(message.read_messages[0].id);
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    readAllMessagesInRoom();
  }, [roomData, id]);

  return (
    <UserChatRoom
      roomData={roomData as ChatmateType}
      setRoomData={
        setRoomData as React.Dispatch<React.SetStateAction<ChatmateType>>
      }
      paramsData={params}
      loading={loading}
    />
  );
}
