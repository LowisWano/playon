import { ChatService } from "@/services/chat.service";
import { ChatmateType } from "@/types/entities/InboxEntity";
import { RoomUserData } from "@/types/entities/UserEntity";
import { useEffect, useState } from "react";

export const useDirectMessagesData = (userId: number) => {
  const [searchName, setSearchName] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<RoomUserData[] | string | null>(null); // response data
  const [recentContacts, setRecentContacts] = useState<RoomUserData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  
  useEffect(() => {
    // fetch contacts data
    const findSender = (u: ChatmateType) =>{
      const sender = u.member1_id !== userId ? u.member1 : u.member2; 
      return sender;
    }
    const fetchRecentContacts = async () => {
      setLoading(true);
      try {
        const data = await ChatService.getAllDirectMessages(userId);
        console.log(data, "DATA HERE");
        const mappedData: RoomUserData[] = data.map(c => ({
          room_id: c.chat_id,
          sender_id: findSender(c).user_id,
          username: findSender(c).first_name + ' ' + findSender(c).last_name,
          profile_pic: findSender(c).profile_pic,
        }));
        setRecentContacts(mappedData);
        console.log(mappedData, "MAPPED DATA HERE");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecentContacts();
    setSearchName(null);
    setSearchResult(null);
  }, [userId]);

  return { 
    searchName, 
    setSearchName, 
    searchResult, 
    recentContacts,
    setSearchResult, 
    loading
  };
}