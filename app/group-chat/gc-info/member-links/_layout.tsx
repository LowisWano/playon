import { Stack } from "expo-router";

export default function GroupChatInfoLayout() {
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
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
