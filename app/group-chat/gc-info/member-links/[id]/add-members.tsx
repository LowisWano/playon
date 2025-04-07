import SearchName from "@/components/create-message/SearchName";
import SearchNameResult from "@/components/create-message/SearchNameResult";
import { useAuth } from "@/context/auth-context";
import { useGroupChatData } from "@/hooks/useGroupChatData";
import { RoomUserData } from "@/types/entities/UserEntity";
import { ChatParams } from "@/types/params/ChatParams";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function AddMembersScreen() {
  const { id: userId } = useAuth();
  const { id } = useLocalSearchParams() as ChatParams;

  const navigation = useNavigation();
  const [addUsers, setAddUsers] = useState<RoomUserData[]>([]);

  const {
    recentContacts,
    searchResult,
    loading,
    searchName,
    setSearchName,
    setSearchResult,
  } = useGroupChatData("add-members", Number(id), userId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            // Handle add members logic here
            console.log("Adding members:", addUsers);
          }}
          disabled={addUsers.length === 0}
        >
          <Ionicons
            name="add"
            size={24}
            color={addUsers.length === 0 ? "grey" : "white"}
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, addUsers]);

  console.log(recentContacts, searchResult);
  console.log(addUsers, "ADD USERS");

  return (
    <View style={style.container}>
      <SearchName
        searchName={searchName}
        playOnUsers={searchResult as RoomUserData[]}
        setSearchName={setSearchName}
        setSearchResult={setSearchResult}
      />
      <SearchNameResult
        route="create-group"
        searchName={searchName}
        searchResult={searchResult}
        contactsData={recentContacts}
        setAddUsers={setAddUsers}
        searchLoading={loading}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBox: {
    backgroundColor: "#3A3A3A",
    borderRadius: 8,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    color: "white",
    padding: 8,
    fontSize: 16,
    width: "100%",
    marginLeft: 8,
  },
});
