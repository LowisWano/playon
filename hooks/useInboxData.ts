import useSWR from "swr";
import { ChatService } from "@/services/chat.service";
import { ChatmateType, GroupUserType, UsersChatmates } from "@/types/entities/InboxEntity";
import { useMemo } from "react";

const fetcher = async (userId: number) => {
  const data : UsersChatmates = await ChatService.getAllUsersChatmate(userId);
  return data;
};


export const useInboxData = (userId: number) => {
  const { data, isLoading } = useSWR(userId.toString(), fetcher, {
    refreshInterval: 10000,
  });

  const sortedToLatestMessages = useMemo(() => {
    if (!data) return [];

    const isUserASenderAndUnread = (g: GroupUserType | null, c: ChatmateType | null) => {
      const messages = g?.group_chat.messages || c?.messages;
      const lastMessage = messages?.[messages.length - 1];
      const readMessages = lastMessage?.read_messages;
  
      if (!readMessages?.length) return false;
  
      return readMessages[0].sent_to_id === userId ? readMessages[0].is_read : true; // true which means the user is the sender
    };

    // Combine and transform chatmates and group_chats into a unified format
    const allChats = [
        ...data.chatmates.map(direct => ({
          id: direct.id,
          type: 'direct',
          room_id: direct.id.toString(),
          isRead: isUserASenderAndUnread(null, direct),
          isSender: direct.messages[0]?.sender_id === userId,
          lastMessageSent: direct.messages[0]?.sent_at || direct.created_at,
          lastMessageContent: direct.messages[0]?.content || '',
          sentByName: null,
          name: direct.member1_id === userId ? direct.member2.username : direct.member1.username,
          image: direct.member1_id === userId ? direct.member2.username : direct.member1.username
      })),
        ...data.group_chats.map(group => ({
          id: group.id,
          type: 'group',
          room_id: group.group_chat_id.toString(),
          isRead: isUserASenderAndUnread(group, null),
          isSender: group.group_chat.messages?.[0]?.sender_id === userId,
          lastMessageSent: group.group_chat.messages?.[0]?.sent_at || group.joined_at,
          lastMessageContent: group.group_chat.messages?.[0]?.content || '',
          sentByName: group.group_chat.messages?.[0]?.sender_id === userId ? 'You' : "group.group_chat.user.username",
          name: group.group_chat.gc_name,
          image: '/image',
      }))
    ];

    return allChats.sort((a, b) => 
      new Date(b.lastMessageSent).getTime() - new Date(a.lastMessageSent).getTime()
    );
  }, [data, userId]);

  return {
    inboxData: sortedToLatestMessages,
    isLoading,
  };
}