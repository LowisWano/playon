import { useLocalSearchParams } from "expo-router";
import GroupChatRoom from "@/components/chat/group-chat/GroupChatRoom";
import { ChatParams } from "@/types/params/ChatParams";
import { useEffect, useState } from "react";
import { GroupChatType } from "@/types/entities/InboxEntity";
import { ChatService } from "@/services/chat.service";

export default function GroupChatScreen() {
  const params = useLocalSearchParams() as ChatParams;
  const [roomData, setRoomData] = useState<GroupChatType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsersGroupChat = async () => {
      try {
        const data = await ChatService.getGroupchatMessages(Number(params.id));
        setRoomData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadUsersGroupChat();
  }, [params.id]);

  return (
    <GroupChatRoom roomData={roomData} paramsData={params} loading={loading} />
  );
}
