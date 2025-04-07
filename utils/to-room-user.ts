import { PlayOnUserData, RoomUserData } from "@/types/entities/UserEntity";

export const convertToRoomData = (user: PlayOnUserData[]) : RoomUserData[] => {
  return user.map((u) => ({
    sender_id: u.user_id,
    username: u.first_name + " " + u.last_name,
    profile_pic: u.profile_pic,
    room_id: null, // only used in direct messages
  }));
}