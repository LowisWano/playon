import { AuthProvider } from "../context/auth-context";
import { RootLayoutNav } from "./root-layout-nav";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
