import useSWR from "swr";
import { ChatService } from "@/services/chat.service";
import {
  Messages,
  UsersChatmates,
} from "@/types/entities/InboxEntity";
import { useMemo } from "react";

const fetcher = async (userId: number) => {
  const data: UsersChatmates = await ChatService.getAllUsersChatmate(userId);
  return data;
};

export const useInboxData = (userId: number) => {
  const { data, isLoading } = useSWR(userId.toString(), fetcher, {
    refreshInterval: 5000,
  });

  const sortedToLatestMessages = useMemo(() => {
    if (!data) return [];

    console.log(data, "DATA HERE");
    const isRead = (m: Messages) => {
      if (!m || m.sender_id === userId) return true;
      return m.read_messages.find(
        (rm) => rm.sent_to_id === userId
      )?.is_read;
    }
    // Combine and transform chatmates and group_chats into a unified format
    const allChats = [
      ...data.chatmates.map((direct) => ({
        id: direct.chat_id,
        type: "direct",
        room_id: direct.chat_id.toString(),
        isRead: isRead(direct.messages[0]),
        isSender: direct.messages[0]?.sender_id === userId,
        lastMessageSent: direct.messages[0]?.sent_at || direct.created_at,
        lastMessageContent: direct.messages[0]?.content || "",
        sentByNameOrId: direct.member1_id === userId 
          ? direct.member2.user_id.toString() 
          : direct.member1.user_id.toString(),
        name:
          direct.member1_id === userId
            ? direct.member2.first_name + " " + direct.member2.last_name
            : direct.member1.first_name + " " + direct.member1.last_name,
        image:
          direct.member1_id === userId
            ? direct.member2.profile_pic
            : direct.member1.profile_pic,
      })),
      ...data.group_chats.map((group) => ({
        id: group.group_chat_id,
        type: "group",
        room_id: group.group_chat_id.toString(),
        isRead: isRead(group.group_chat.messages[0]),
        isSender: group.group_chat.messages?.[0]?.sender_id === userId,
        lastMessageSent: group.group_chat.messages?.[0]?.sent_at || group.joined_at,
        lastMessageContent: group.group_chat.messages?.[0]?.content || "",
        name: group.group_chat.gc_name,
        image: "/image",
        isGcMuted: group.is_on_mute,
        isGcAdmin: group.group_chat.created_by === userId,
        sentByNameOrId:
          group.group_chat.messages?.[0]?.sender_id === userId
            ? "You"
            : group.group_chat.messages?.[0]?.sender?.first_name,
      })),
    ];

    return allChats.sort(
      (a, b) =>
        new Date(b.lastMessageSent).getTime() -
        new Date(a.lastMessageSent).getTime()
    );
  }, [data, userId]);

  return {
    inboxData: sortedToLatestMessages,
    isLoading,
  };
};
