import SearchName from "@/components/create-message/SearchName";
import SearchNameResult from "@/components/create-message/SearchNameResult";
import { BasicUserData } from "@/types/entities/User";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
  const [searchName, setSearchName] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<BasicUserData[] | string | null>(null); // response data
  const [contactsData, setContactsData] = useState<BasicUserData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // fetch contacts data
    setSearchName(null);
    setSearchResult(null);
    setContactsData(null);
    setLoading(false);
  }, []);

  if (loading) {
    // will change to skeleton loading
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <NavigateToCreateGroup />
      <SearchName searchName={searchName} setSearchName={setSearchName} />
      <SearchNameResult
        route="create-message"
        searchName={searchName}
        searchResult={searchResult}
        contactsData={contactsData}
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
      <Ionicons name="people" size={20} color="white" style={{ marginLeft: 5 }} />
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
