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
        headerTitle: "New group",
        contentStyle: {
          backgroundColor: "#252422",
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
