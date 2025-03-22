import { Stack } from "expo-router";

export default function CreateGroupLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#252422",
        },
        headerTintColor: "#fff",
        headerTitle: "Add member",
        contentStyle: {
          backgroundColor: "#252422",
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
