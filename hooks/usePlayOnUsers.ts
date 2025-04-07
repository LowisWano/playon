import { UserService } from "@/services/user.service";
import { RoomUserData } from "@/types/entities/UserEntity";
import { convertToRoomData } from "@/utils/to-room-user";
import { useEffect, useState } from "react";


export const usePlayOnUsers = (searchName: string | null, userId: number) => {
  const [playOnUsers, setPlayOnUsers] = useState<RoomUserData[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setPlayOnUsers(undefined);
    if (!searchName) return;
    const fetchPlayOnUsers = async () => {
      setLoading(true);
      try {
        const users = await UserService.getAllPlayOnUsers(searchName, userId);
        if (!users) return;
        const mappedUsers = convertToRoomData(users);
        setPlayOnUsers(mappedUsers);
        setTimeout(() => setLoading(false), 1000); // let other states update first
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchPlayOnUsers();
  }, [searchName, userId]);

  return { playOnUsers, loading };
}