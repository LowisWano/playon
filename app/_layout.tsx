import { NotificationProvider } from "@/contexts/NotificationContext";
import { UserProvider } from "@/contexts/UserContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <NotificationProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="user-chat" options={{ headerShown: false }} />
          <Stack.Screen name="group-chat" options={{ headerShown: false }} />
          <Stack.Screen
            name="create-message"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </NotificationProvider>
    </UserProvider>
  );
}
