import { ChatService } from "@/services/chat.service";
import { GroupUserType } from "@/types/entities/InboxEntity";
import { RoomUserData } from "@/types/entities/UserEntity";
import { convertToRoomData } from "@/utils/to-room-user";
import { useEffect, useState } from "react";


// @ used in app/group-chat/gc-info/member-links/[id]

export const useGroupChatData = (route: string, gcId: number, userId: number) => {

  const [gcMembers, setGcMembers] = useState<GroupUserType[]>([]); // view-members route
  const [pendingMembers, setPendingMembers] = useState<GroupUserType[]>([]); // member-request route
  const [admin, setAdmin] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // add-members route
  const [searchName, setSearchName] = useState<string | null>(null);
  const [recentContacts, setRecentContacts] = useState<RoomUserData[]>([]);
  const [searchResult, setSearchResult] = useState<RoomUserData[] | string | null>(null);

  useEffect(() => {
    if(route === 'add-members') return;
    const fetchPendingMembers = (data: GroupUserType[]) => {
      const pending = data.filter((d) => d.is_pending === true);
      setPendingMembers(pending);
      setLoading(false);
    }

    const fetchGcMembers = (data: GroupUserType[]) => {
      const members = data.filter((d) => d.is_pending === false);
      setGcMembers(members);
      setLoading(false);
    }

    const fetchGroupChat = async () => {
      try {
        const data = await ChatService.getGroupChatMessages(gcId);
        setAdmin(data.created_by);
        if(route === 'view-members'){
          fetchGcMembers(data.group_users);
        } else if(route === 'member-requests'){
          fetchPendingMembers(data.group_users);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchGroupChat();
  }, [gcId, route]);

  // add-members route
  useEffect(() => {
    if(route !== 'add-members') return;
    const fetchRecentContacts = async () => {
      try {
        const data = await ChatService.recentContactsNotInGroupChat(gcId, userId);
        console.log(data, "RECENT CONTACTS");
        const mappedData = convertToRoomData(data);
        setRecentContacts(mappedData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentContacts();
  }, [gcId, userId, route]);


  // Search Trigger (add-members route)
  useEffect(() => {
    if(searchName === null) return;
    setLoading(true);
    setSearchResult(null)
    const fetchSearchResult = async () => {
      try {
        const data = await ChatService.searchUsersNotInGroupChat(gcId, searchName, userId);
        const mappedData = convertToRoomData(data);
        setSearchResult(mappedData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearchResult();
  }, [searchName, gcId, userId]);

  return { 
    gcMembers, 
    pendingMembers, 
    loading,
    admin,
    searchName,
    setSearchName,
    recentContacts,
    searchResult,
    setSearchResult
  };
}

