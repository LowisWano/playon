import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dummyImage =
  "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  username: string;
  profile: string;
  id: number;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const [id, setId] = useState(0); // all real id starts with 1

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const authStatus = await AsyncStorage.getItem("isAuthenticated");
        const username = await AsyncStorage.getItem("username");
        const profile = await AsyncStorage.getItem("profile");
        const id = await AsyncStorage.getItem("id");
        setIsAuthenticated(authStatus === "true");
        setUsername(username || "John Doe");
        setProfile(profile || "");
        setId(id ? parseInt(id) : 1);
      } catch (error) {
        console.error("Error checking authentication status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  console.log(id, "AUTH ID");

  const login = async (username: string, password: string) => {
    // Replace with your actual authentication logic
    if (username === "user" && password === "password") {
      // Api call here

      // Below are the mock data, replace with the actual api response
      await AsyncStorage.setItem("isAuthenticated", "true");
      await AsyncStorage.setItem("username", "username");
      await AsyncStorage.setItem("id", "1");
      await AsyncStorage.setItem("profile", dummyImage);
      setIsAuthenticated(true);
      setProfile(dummyImage);
      setUsername(username);
      setId(1);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await AsyncStorage.removeItem("isAuthenticated");
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("profile");
    await AsyncStorage.removeItem("id");
    setIsAuthenticated(false);
    setUsername("");
    setProfile("");
    setId(0);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoading,
        username,
        profile,
        id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
