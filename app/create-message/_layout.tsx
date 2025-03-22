// import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";

export default function CreateInboxLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#252422",
        },
        headerTintColor: "#fff",
        headerTitle: "New message",
        contentStyle: {
          backgroundColor: "#252422",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="create-group" options={{ headerShown: false }} />
    </Stack>
  );
}
