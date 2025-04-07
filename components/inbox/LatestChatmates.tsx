import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Link, router } from "expo-router";
import { LatestChatmatesProps } from "@/types/props/MessagesProps";
import { convertToInboxTime } from "@/utils/time";
import { useState, useRef } from "react";
import { InboxChatmates } from "@/types/entities/InboxEntity";
import ChatmateHoldModal from "./ChatmateHoldModal";

export default function LatestChatmates({
  data,
  inboxData,
}: LatestChatmatesProps) {
  
  const [selectedChat, setSelectedChat] = useState<InboxChatmates | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;


  const openModal = (chat: InboxChatmates) => {
    setSelectedChat(chat);
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start();
  };

  if (inboxData.length === 0) {
    return <TempData data={data} />; // Replace to skeleton loading
  }

  return (
    <View>
      {inboxData.map((chat) => (
        <TouchableOpacity
          key={chat.name}
          style={{ marginBottom: 12, marginTop: 12 }}
          onPress={() => {
            router.push({
              pathname:
                chat.type === "direct" ? "/user-chat/[id]" : "/group-chat/[id]",
              params: {
                id: chat.id,
                name: chat.name,
                profile: chat.image,
                to: chat.type === "direct" ? chat.sentByNameOrId : "gc",
              },
            });
          }}
          onLongPress={() => openModal(chat)}
          delayLongPress={200} // Hold for 200ms den trigger
        >
          <View style={styles.latestChatmatesContainer}>
            <Image 
              source={{ uri: chat.image }} 
              style={styles.profile} 
            />
            <View style={styles.col}>
              <Text style={styles.name}>{chat.name}</Text>
              <View style={styles.row}>
                {chat.lastMessageContent ? (
                  <Text
                    style={[
                      styles.latestMessage,
                      {
                        color: chat.isRead ? "grey" : "white",
                      },
                    ]}
                  >
                    {chat.isSender
                      ? "You: "
                      : chat.type === "group"
                        ? chat.sentByNameOrId + ": "
                        : ""}
                    {chat.lastMessageContent}
                  </Text>
                ) : (
                  <Text style={styles.latestMessage}>Created the group</Text>
                )}
                <Text style={styles.latestMessage}>
                  | {convertToInboxTime(chat.lastMessageSent)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <ChatmateHoldModal 
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        fadeAnim={fadeAnim}
        slideAnim={slideAnim}
      />
      
    </View>
  );
}


type Props = {
  data: {
    //test data
    id: number;
    name: string;
    type: string;
  }[];
};

function TempData({ data }: Props) {
  return data.map((chat) => (
    <Link
      key={chat.id}
      href={{
        pathname: "/group-chat/[id]",
        params: chat,
      }}
      style={{ marginBottom: 12, marginTop: 12 }}
    >
      <View style={styles.latestChatmatesContainer}>
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            backgroundColor: "white",
          }}
        />
        <View>
          <Text style={{ color: "white", fontSize: 15 }}>{chat.name}</Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ color: "grey", fontSize: 12 }}>
              You: {chat.type}
            </Text>
            <Text style={{ color: "grey", fontSize: 12 }}>| 2:53 PM</Text>
          </View>
        </View>
      </View>
    </Link>
  ));
}

const styles = StyleSheet.create({
  latestChatmatesContainer: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "white",
  },
  latestMessage: {
    color: "grey",
    fontSize: 12,
  },
  name: {
    color: "white",
    fontSize: 15,
  },
  col: {
    flexDirection: "column",
    gap: 3,
  },
  row: {
    flexDirection: "row",
    gap: 5,
  },
});
