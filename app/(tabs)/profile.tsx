import { Text, View, StyleSheet, Pressable } from "react-native";
import { useAuth } from "../../context/auth-context";

export default function ProfileScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile screen</Text>
      <Pressable style={styles.logoutButton} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252422",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
