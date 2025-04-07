
// type User = {
//     id: number;
//     first_name: string;
//     last_name: string;
//     email: string;
//     password: string;
//     locaton: string;
//     profile_pic: string;
//     rank: number;
//     is_verified: boolean;
//     role: string;
//     // chats_sent: null;
//     // chats_received: null;
//     // messages: null;
//     // match_users: null;
//     // teams: null;
//     // team_users: null;
//     // group_users: null;
//     // created_groups: null;
//     // teams_leader: null;
//     // notifications: null;
//     // read_messages: null;
// }

export type RoomUserData = {
    room_id: number | null;
    sender_id: number;
    username: string;
    profile_pic: string;
}

export type PlayOnUserData = {
  user_id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
}