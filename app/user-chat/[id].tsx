import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ChatParams } from "@/types/params/ChatParams";
import UserChatRoom from "@/components/chat/user-chat/UserChatRoom";
import { ChatService } from "@/services/chat.service";
import { ChatmateType } from "@/types/entities/InboxEntity";

export default function UserChatScreen() {
  const params = useLocalSearchParams() as ChatParams;
  const [roomData, setRoomData] = useState<ChatmateType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsersDirectChat = async () => {
      try {
        const data = await ChatService.getChatmateMessages(Number(params.id));
        setRoomData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadUsersDirectChat();
  }, [params.id]);

  useEffect(() => {
    const readAllMessagesInRoom = async () => {
      if (roomData) {
        try {
          roomData.forEach(async (message) => {
            // await ChatService.readMessage(message.id);
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    readAllMessagesInRoom();
  }, [roomData]);

  return (
    <UserChatRoom roomData={roomData} paramsData={params} loading={loading} />
  );
}
