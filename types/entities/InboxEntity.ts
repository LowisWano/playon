import { User } from "./User";

type ReadMessages = {
    id: number;
    message_id: number;
    sent_to_id: number;
    is_read: boolean;
    read_at: string;
}

export type Messages = {
    id: number;
    //both are receiver relationship
    user_chat_id: null | number;
    group_chat_id: null | number;
    sender_id: number;
    content: string;
    is_deleted: boolean;
    sent_at: string;
    read_messages: ReadMessages[];
}

export type GroupChatType = {
    id: number;
    created_by: number;
    gc_name: string;
    group_pic: string | null;
    created_at: string;
    creator: User | null;
    group_users: GroupUserType[];
    messages: Messages[] | null;
}

export type GroupUserType = {
    id: number;
    group_chat_id: number;
    user_id: number;
    isPending: boolean;
    isGcOnMute: boolean;
    joined_at: string;
    group_chat: GroupChatType;
    user: User;
}

export type ChatmateType = {
    id: number;
    member1_id: number;
    member2_id: number;
    room_id: string;
    created_at: string;
    member1: User;
    member2: User;
    messages: Messages[] | [];
}

export type UsersChatmates = {
    chatmates: ChatmateType[];
    group_chats: GroupUserType[];
}
export type InboxChatmates = {
    id: number;
    type: string;
    room_id: string;
    name: string;
    image: string;
    isSender: boolean;
    isRead: boolean;
    sentByName: string | null;
    lastMessageSent: string;
    lastMessageContent: string;
};
