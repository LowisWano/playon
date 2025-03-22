import SearchName from "@/components/create-message/SearchName";
import SearchNameResult from "@/components/create-message/SearchNameResult";
import { BasicUserData } from "@/types/entities/User";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

export default function Index() {
  const [searchName, setSearchName] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<
    BasicUserData[] | string | null
  >(null); // response data
  const [contactsData, setContactsData] = useState<BasicUserData[] | null>(
    null
  );
  const [addUsers, setAddUsers] = useState<BasicUserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(addUsers);

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
          placeholderTextColor={"grey"}
        />
      </View>
      <SearchName searchName={searchName} setSearchName={setSearchName} />
      <SearchNameResult
        route="create-group"
        searchName={searchName}
        searchResult={searchResult}
        contactsData={contactsData}
        setAddUsers={setAddUsers}
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
