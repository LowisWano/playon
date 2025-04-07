import SearchName from "@/components/create-message/SearchName";
import SearchNameResult from "@/components/create-message/SearchNameResult";
import { useAuth } from "@/context/auth-context";
import { useDirectMessagesData } from "@/hooks/useDirectData";
import { usePlayOnUsers } from "@/hooks/usePlayOnUsers";
import { RoomUserData } from "@/types/entities/UserEntity";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
  const { id } = useAuth();
  const navigation = useNavigation();
  const [addUsers, setAddUsers] = useState<RoomUserData[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  // probably a random image for the group
  // const [groupImage, setGroupImage] = useState<string>("");
  console.log(addUsers, "ADD USERS");

  const {
    loading,
    searchName,
    searchResult,
    setSearchName,
    recentContacts,
    setSearchResult,
  } = useDirectMessagesData(id);

  const { playOnUsers, loading: searchLoading } = usePlayOnUsers(
    searchName,
    id
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            // Handle add members logic here
            console.log("Adding membersww:", addUsers);
          }}
          disabled={addUsers.length === 0 || groupName === ""}
        >
          <Ionicons
            name="add"
            size={24}
            color={addUsers.length === 0 || groupName === "" ? "grey" : "white"}
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, addUsers, groupName]);

  console.log(groupName, "GROUP NAME");

  return (
    <View style={style.container}>
      <View style={style.searchBox}>
        <Ionicons
          name="people"
          size={20}
          color="white"
          style={{ marginLeft: 5 }}
        />
        <TextInput
          style={style.input}
          placeholder="Enter group name"
          value={groupName}
          onChangeText={(text) => setGroupName(text)}
          placeholderTextColor={"grey"}
        />
      </View>
      <SearchName
        searchName={searchName}
        playOnUsers={playOnUsers}
        setSearchName={setSearchName}
        setSearchResult={setSearchResult}
      />
      <SearchNameResult
        route="create-group"
        searchName={searchName}
        searchResult={searchResult}
        contactsData={recentContacts}
        setAddUsers={setAddUsers}
        searchLoading={loading ? loading : searchLoading}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#252422",
    gap: 16,
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
  textGC: {
    color: "grey",
    padding: 8,
    fontSize: 16,
    marginLeft: 8,
  },
});
