import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/auth-context";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      console.log("Login successful");
      router.replace("/(tabs)");
    } else {
      console.log("invalid username or password");
      Alert.alert("Login Failed", "Invalid username or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PlayOn</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#a0a0a0"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#a0a0a0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    color: "#fff",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
