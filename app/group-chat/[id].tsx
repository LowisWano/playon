import { useLocalSearchParams } from "expo-router";
import GroupChatRoom from "@/components/chat/group-chat/GroupChatRoom";
import { ChatParams } from "@/types/params/ChatParams";
import { useEffect, useState } from "react";
import { GroupChatType } from "@/types/entities/InboxEntity";
import { ChatService } from "@/services/chat.service";
import { useAuth } from "@/context/auth-context";

export default function GroupChatScreen() {
  const { id } = useAuth();
  const params = useLocalSearchParams() as ChatParams;
  const [roomData, setRoomData] = useState<GroupChatType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsersGroupChat = async () => {
      try {
        const data = await ChatService.getGroupChatMessages(Number(params.id));
        setRoomData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadUsersGroupChat();
  }, [params.id]);

  useEffect(() => {
    const readAllMessagesInRoom = async () => {
      if (roomData) {
        try {
          roomData.messages.forEach(async (message) => {
            if (message.sender_id !== id) {
              const readMsg = message.read_messages.find(
                (msg) => msg.sent_to_id === id
              );
              if (readMsg && !readMsg.is_read) {
                await ChatService.readMessage(readMsg.id);
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

  console.log(roomData, "ROOM DATA");

  return (
    <GroupChatRoom
      roomData={roomData as GroupChatType}
      setRoomData={
        setRoomData as React.Dispatch<React.SetStateAction<GroupChatType>>
      }
      paramsData={params}
      loading={loading}
    />
  );
}
