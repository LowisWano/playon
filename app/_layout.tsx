import { NotificationProvider } from "@/context/notification-context";
import { AuthProvider } from "@/context/auth-context";
import RootLayoutNav from "./root-layout-nav";

export default function RootLayout() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <RootLayoutNav />
      </NotificationProvider>
    </AuthProvider>
  );
}
