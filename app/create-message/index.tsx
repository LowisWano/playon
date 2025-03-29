import SearchName from "@/components/create-message/SearchName";
import SearchNameResult from "@/components/create-message/SearchNameResult";
import { useAuth } from "@/context/auth-context";
import { useDirectMessagesData } from "@/hooks/useDirectData";
import { usePlayOnUsers } from "@/hooks/usePlayOnUsers";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
  const { id } = useAuth();

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

  console.log(playOnUsers, "PLAYON");

  return (
    <View style={style.container}>
      <NavigateToCreateGroup />
      <SearchName
        searchName={searchName}
        playOnUsers={playOnUsers}
        setSearchName={setSearchName}
        setSearchResult={setSearchResult}
      />
      <SearchNameResult
        route="create-message"
        searchName={searchName}
        searchResult={searchResult}
        contactsData={recentContacts}
        searchLoading={loading ? loading : searchLoading}
      />
    </View>
  );
}

function NavigateToCreateGroup() {
  return (
    <TouchableOpacity
      style={style.searchBox}
      onPress={() => {
        router.push("/create-message/create-group");
      }}
    >
      <Ionicons
        name="people"
        size={20}
        color="white"
        style={{ marginLeft: 5 }}
      />
      <Text style={style.textGC}>New group</Text>
      <Ionicons
        name="chevron-forward"
        size={20}
        color="white"
        style={{ marginLeft: "auto", marginRight: 8 }}
      />
    </TouchableOpacity>
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
  text: {
    color: "white",
    fontSize: 15,
    marginLeft: 8,
    padding: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
