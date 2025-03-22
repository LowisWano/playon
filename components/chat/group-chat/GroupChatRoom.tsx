import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useChatRoom } from "@/hooks/useChatRoom";
import { useAuth } from "@/context/auth-context";
import TestChats from "../TestChats";
import { GroupChatType, Messages } from "@/types/entities/InboxEntity";
import { ChatParams } from "@/types/params/ChatParams";
import RoomInputForm from "../RoomInputForm";
import Ionicons from "@expo/vector-icons/Ionicons";

type GroupChatRoomProps = {
  roomData: GroupChatType | undefined;
  paramsData: ChatParams;
  loading: boolean;
};

export default function GroupChatRoom({
  roomData,
  paramsData,
  loading,
}: GroupChatRoomProps) {
  const { id: userId, username, profile } = useAuth();

  const propsCR = {
    room_id: Number(paramsData.id),
    sender_id: userId,
    username,
    profile,
    room_type: "group-chat",
    room_name: paramsData.name,
  };

  const {
    inputMessage,
    setInputMessage,
    image,
    pickImage,
    uploadImage,
    wsConnection,
    roomMessages: gcMessages,
  } = useChatRoom(propsCR);

  const inputFormProps = {
    pickImage,
    setInputMessage,
    inputMessage,
    wsConnection,
    image,
    uploadImage,
  };

  const findSender = (sender_id: number) => {
    if (roomData === undefined) return;
    return roomData.group_users.find((member) => member.id === sender_id)?.user;
  };

  const viewMessages = () => {
    if (roomData === undefined) return <></>;

    console.log(roomData, "ROOM DATA");

    return roomData.messages?.map((message: Messages, index: number) => (
      <View key={index}>
        <View
          style={
            message.sender_id === userId
              ? styles.sentByYouContainer
              : { alignSelf: "flex-start" }
          }
        >
          {/* if not equal to userId then display the sender else just the "seen" icon */}
          {message.sender_id !== userId ? (
            <Text style={styles.sentByChatmateText}>
              {findSender(message.sender_id)?.username}
            </Text>
          ) : (
            <Ionicons name="person-circle" size={15} color="white" />
          )}
          <View
            style={[
              styles.sentByBoth,
              message.sender_id === userId
                ? { backgroundColor: "white" }
                : { borderWidth: 1, borderColor: "white" },
            ]}
          >
            <Text
              style={
                message.sender_id === userId
                  ? { color: "black" }
                  : { color: "white" }
              }
            >
              {message.content}
            </Text>
          </View>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {loading ? (
          <TestChats directMessages={gcMessages} /> // Test, will replace to loading
        ) : (
          viewMessages()
        )}
      </ScrollView>
      <RoomInputForm {...inputFormProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingLeft: 25,
    paddingRight: 25,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    flex: 1,
    borderRadius: 24,
    borderColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  imageContainer: {
    marginVertical: 16,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  imageText: {
    fontSize: 16,
    color: "#333",
  },
  sentByYouContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  sentByBoth: {
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 18,
  },
  sentByChatmateText: {
    color: "grey",
    padding: 5,
    fontSize: 12,
  },
});
