// import Ionicons from "@expo/vector-icons/Ionicons";
import { ChatParams } from "@/types/params/ChatParams";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GroupChatLayout() {
  const { id, name, profile } = useLocalSearchParams() as ChatParams;
  console.log(id, name, profile);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#252422",
        },
        headerTintColor: "#fff",
        contentStyle: {
          backgroundColor: "#252422",
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/group-chat/gc-info/[id]",
                params: { id, name, profile },
              })
            }
          >
            <Ionicons
              name="information-circle"
              size={24}
              color="white"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        ),
        headerTitle: () => {
          return (
            <View style={style.container}>
              <Image source={{ uri: profile }} style={style.image} />
              <Text style={style.text}>{name}</Text>
            </View>
          );
        },
      }}
    >
      <Stack.Screen name="[id]" />
      <Stack.Screen name="gc-info" options={{ headerShown: false }} />
    </Stack>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
