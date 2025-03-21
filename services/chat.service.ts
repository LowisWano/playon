import { api } from "../config/axios";
import { ChatmateType, GroupChatType, UsersChatmates } from "../types/entities/InboxEntity";

export class ChatService {
    static async getAllUsersChatmate(userId: number) {
        try{
            const usersMessages = await api.get<UsersChatmates>(`/read-message/get-all-messages-of-user/${userId}`).then(res => res.data);
            return usersMessages
        }catch(err){
            console.log(err)
            throw new Error("Error Fetching User's Chatmate.")
        }
    }
    static async getChatmateMessages(user_chat_id: number) {
        try{
            const directChatMessages = await api.get<ChatmateType[]>(`/user-chat/get-chatmate/${user_chat_id}`).then(res => res.data);
            return directChatMessages
        }catch(err){
            console.log(err)
            throw new Error("Error Fetching Direct Chat Messages.")
        }
    }

    static async getGroupchatMessages(gc_id: number) {
        try{
            const groupChatMessages = await api.get<GroupChatType>(`/group-chat/visit/${gc_id}`).then(res => res.data);
            return groupChatMessages
        }catch(err){
            console.log(err)
            throw new Error("Error Fetching Group Chat Messages.")
        }
    }

    static async readMessage(message_id: number) {
        try {
            await api.patch(`/read-message/read/${message_id}`);
        } catch (err) {
            console.log(err);
            throw new Error("Error Reading Message.");
        }
    }
}
