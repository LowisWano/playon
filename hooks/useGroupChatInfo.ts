import { ChatService } from "@/services/chat.service"
import { useEffect, useState } from "react";

export const useGroupChatInfo = (gcId: number, userId: number) => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if(errorMessage === null) return;
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000)
  }, [errorMessage]);

  useEffect(() => {
    if(successMessage === null) return;
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000)
  }, [successMessage]);

  const startDirectMessage = async (content: string, sentTo: number, from: number, roomId: number) => {
    try {
      setLoading(true);
      const data = await ChatService.startDirectMessage(content, sentTo, from, roomId);
      setSuccessMessage("Message sent successfully!");
      return data;
    } catch (error) {
      setErrorMessage((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const createGroupChat = async (gcName: string, image: string, members: number[]) => {
    try {
      setLoading(true);
      const data = await ChatService.createGroupChat(gcName, image, userId, members);
      console.log(data, "Group Chat Data");
      setSuccessMessage("Group chat created successfully!");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const kickMember = async (kickUser: number) => {
    try {
      setLoading(true);
      await ChatService.kickUserFromGroupChat(gcId, kickUser);
      setSuccessMessage("Member kicked successfully!");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const viewMemberProfile = (viewTo: number) => {
    console.log("navigate to")
  }

  const transferAdmin = async (transferTo: number) => {
    try {
      setLoading(true);
      await ChatService.transferAdminRole(gcId, transferTo);
      setSuccessMessage("Admin role transferred successfully!");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const leaveGroup = async () => {
    try {
      setLoading(true);
      await ChatService.leaveGroupChat(userId);
      setSuccessMessage("You have left the group successfully!");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const acceptMemberRequest = async (acceptUserId: number) => {
    try {
      setLoading(true);
      await ChatService.acceptMemberRequest(acceptUserId);
      setSuccessMessage("Member request accepted successfully!");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const addMember = async (isAdmin: boolean, isAutoApprove: boolean, addUserId: number) => {
    try {
      setLoading(true);
      await ChatService.addMemberToGroupChat(gcId, addUserId, isAdmin, isAutoApprove);
      setSuccessMessage("Member added successfully!");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return { 
    kickMember, 
    transferAdmin, 
    leaveGroup, 
    acceptMemberRequest, 
    addMember,
    viewMemberProfile,
    createGroupChat,
    startDirectMessage,
    errorMessage,
    successMessage,
    loading,
  }
}