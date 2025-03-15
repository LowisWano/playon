import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { ActivityIndicator, View } from "react-native";

export default function RootLayoutNav() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(tabs)";
    const isMatchPage = segments[0] === "match";

    if (!isAuthenticated && (inAuthGroup || isMatchPage)) {
      // Redirect to login if trying to access protected routes while not authenticated
      router.replace("/login");
    } else if (isAuthenticated && !inAuthGroup && !isMatchPage) {
      // Redirect to home if authenticated but not in tabs or match page
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, segments, isLoading]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#25292e",
        }}
      >
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="match" options={{ headerShown: false }} />
    </Stack>
  );
}
