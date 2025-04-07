import { Stack } from "expo-router";
export default function GroupChatInfoLayout() {
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
      }}
    >
      <Stack.Screen
        name="add-members"
        options={{ headerTitle: "Add members" }}
      />
      <Stack.Screen name="view-members" options={{ headerTitle: "Members" }} />
      <Stack.Screen
        name="member-requests"
        options={{ headerTitle: "Member requests" }}
      />
    </Stack>
  );
}
