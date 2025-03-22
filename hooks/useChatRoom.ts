import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

type ChatRoomProps = {
  room_id: number;
  sender_id: number; // Your id
  username: string;
  profile: string;
  room_type: string;
  room_name: string;
};

export const useChatRoom = (p: ChatRoomProps) => {
  const [inputMessage, setInputMessage] = useState("");
  const [wsConnection, setWsConnection] = useState<null | WebSocket>(null);
  const [roomMessages, setRoomMessages] = useState<string[]>([""]);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8000/${p.room_type}/ws/${Number(p.room_id)}/${p.room_name}/${Number(p.sender_id)}/${p.username}/1`
    );
    // const ws = new WebSocket(`ws://192.168.50.136:8000/group-chat/ws/${room}/${id}`);
    setWsConnection(ws);
    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      console.log("Received:", event.data);
      setRoomMessages((roomMessages) => [...roomMessages, event.data]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };
  }, [p.room_id, p.sender_id, p.username, p.profile, p.room_type, p.room_name]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      //   setInputMessage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    try {
      return "data"; // avoid any error for now
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return {
    inputMessage,
    setInputMessage,
    wsConnection,
    roomMessages,
    image,
    pickImage,
    uploadImage,
  };
};
