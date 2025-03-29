import { ChatParams } from "@/types/params/ChatParams";
import { Stack, useLocalSearchParams } from "expo-router";

export default function GroupChatInfoLayout() {
  const { id, name, profile } = useLocalSearchParams() as ChatParams;
  console.log(id, name, profile);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#252422",
        },
        headerTintColor: "#fff",
        headerTitle: "",
        contentStyle: {
          backgroundColor: "#252422",
        },
      }}
    >
      <Stack.Screen name="[id]" />
      <Stack.Screen name="member-links" options={{ headerShown: false }} />
    </Stack>
  );
}
