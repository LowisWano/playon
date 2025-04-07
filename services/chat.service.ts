import { RoomUserData, PlayOnUserData } from "@/types/entities/UserEntity";
import { api } from "../config/axios";
import {
  ChatmateType,
  GroupChatType,
  UsersChatmates,
} from "../types/entities/InboxEntity";

// *************************
// Will change to params to dto
// *************************

export class ChatService {
  static async getAllUsersChatmate(userId: number) {
    try {
      const usersMessages = await api
        .get<UsersChatmates>(`/read-message/get-all-messages-of-user/${userId}`)
        .then((res) => res.data);
      return usersMessages;
    } catch (err) {
      console.log(err);
      throw new Error("Error Fetching User's Chatmate.");
    }
  }
  static async getAllDirectMessages(userId: number) {
    try {
      const directMessages = await api
        .get<ChatmateType[]>(`/user-chat/get-all-chatmate/${userId}`)
        .then((res) => res.data);
      return directMessages;
    } catch (err) {
      console.log(err);
      throw new Error("Error Fetching All Direct Messages.");
    }
  }
  static async getDirectMessages(user_chat_id: number) {
    try {
      const directChatMessages = await api
        .get<ChatmateType>(`/user-chat/get-chatmate/${user_chat_id}`)
        .then((res) => res.data);
      return directChatMessages;
    } catch (err) {
      console.log(err);
      throw new Error("Error Fetching Direct Chat Messages.");
    }
  }

  static async getGroupChatMessages(gcId: number) {
    try {
      const groupChatMessages = await api
        .get<GroupChatType>(`/group-chat/visit/${gcId}`)
        .then((res) => res.data);
      return groupChatMessages;
    } catch (err) {
      console.log(err);
      throw new Error("Error Fetching Group Chat Messages.");
    }
  }
  static async getUsersNotInGroupChat(gcId: number) {
    try {
      const usersNotInGroupChat = await api
        .get<RoomUserData[]>(`/group-chat/users-not-in-group-chat/${gcId}`)
        .then((res) => res.data);
      return usersNotInGroupChat;
    } catch (err) {
      console.log(err);
      throw new Error("Error Fetching Users Not In Group Chat.");
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
  static async kickUserFromGroupChat(gcId: number, userId: number) {
    try {
      await api.delete(`/group-chat/kick-member/${userId}`);
    } catch (err) {
      console.log(err);
      throw new Error("Error Kicking User From Group Chat.");
    }
  }
  static async transferAdminRole(gcId: number, userId: number) {
    try {
      await api.patch(`/group-chat/transfer-admin/${gcId}/${userId}`);
    } catch (err) {
      console.log(err);
      throw new Error("Error Transfering Admin Role.");
    }
  }
  static async leaveGroupChat(userId: number) {
    try {
      await api.delete(`/group-chat/leave-gc/${userId}`);
    } catch (err) {
      console.log(err);
      throw new Error("Error Leaving Group Chat.");
    }
  }
  static async acceptMemberRequest(userId: number) {
    try {
      await api.patch(`/group-chat/accept-user/${userId}`);
    } catch (err) {
      console.log(err);
      throw new Error("Error Accepting User To Group Chat.");
    }
  }
  static async addMemberToGroupChat(gcId: number, userId: number, isAdmin: boolean, isAutoApprove: boolean) {
    try {
      await api.post(`/group-chat/add-to-group-chat`, {
        gcId,
        userId,
        isAdmin,
        isAutoApprove,
      });
    } catch (err) {
      console.log(err);
      throw new Error("Error Inviting User To Group Chat.");
    }
  }
  static async recentContactsNotInGroupChat(gcId: number, userId: number) {
    try {
      const recentContacts = await api
        .get<PlayOnUserData[]>(`/group-chat/recent-contacts-not-in-gc/${gcId}/${userId}`)
        .then((res) => res.data);
      return recentContacts;
    } catch (err) {
      console.log(err);
      throw new Error("Error Fetching Recent Contacts.");
    }
  }
  static async searchUsersNotInGroupChat(gcId: number, username: string, userId: number) {
    try {
      const users = await api
        .get<PlayOnUserData[]>(`/group-chat/users-not-in-group-chat/${gcId}/${username}/${userId}`)
        .then((res) => res.data);
      return users;
    } catch (err) {
      console.log(err);
      throw new Error("Error Fetching Users.");
    }
  }
  static async startDirectMessage (
    message: string,
    sentTo: number,
    from: number,
    roomId: number
  ) {
    try {
      const res = await api.post(`/user-chat/create-conversation`, {
        message,
        sentTo,
        from,
        roomId,
      }).then((res) => res.data);
      return res;
    } catch (err) {
      console.log(err);
      throw new Error("Error Sending Direct Message.");
    }
  }
  static async createGroupChat(
    name: string,
    image: string,
    createdBy: number,
    members: number[],
  ) {
    try {
      const res = await api.post(`/group-chat/create-gc`, {
        name,
        image,
        createdBy,
        members,
      }).then((res) => res.data);
      return res;
    } catch (err) {
      console.log(err);
      throw new Error("Error Creating Group Chat.");
    }
  }
}
