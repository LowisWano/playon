import { UnknownOutputParams } from "expo-router";

// This is for a specific ChatMate/GroupChat that you have in ur inbox
export interface ChatParams extends UnknownOutputParams {
    id: string; // roomid
    name: string;
    profile: string;
    sentTo: string;
}