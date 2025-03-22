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
import { FontAwesome } from "@expo/vector-icons";

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
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Please input your details below.</Text>
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
      <Text style={styles.subtitle}>Forgot Password</Text>
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Text style={styles.subtitle}>or</Text>

      {/* Google Sign-In Button */}
      <Pressable
        style={styles.googleButton}
        onPress={() => {
          console.log("Google login pressed");
          // Implement your Google login logic here
        }}
      >
        <FontAwesome name="google" size={24} color="black" />
      </Pressable>
      <Text style={styles.subtitle}>Don&apos;t have an account? Sign up.</Text>
      <Text style={styles.subtitle}>
        By logging in to PlayOn, you agree to our Terms and Privacy policy.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252422",

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
  subtitle: {
    fontSize: 16,
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
  googleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
