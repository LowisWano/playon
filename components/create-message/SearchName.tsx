import { View, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { RoomUserData } from "@/types/entities/UserEntity";

type SearchNameResultProps = {
  searchName: string | null;
  playOnUsers: RoomUserData[] | undefined;
  setSearchName: React.Dispatch<React.SetStateAction<string | null>>;
  setSearchResult: React.Dispatch<React.SetStateAction<string | RoomUserData[] | null>>
};

export default function SearchName({
  searchName,
  playOnUsers,
  setSearchName,
  setSearchResult,
}: SearchNameResultProps) {

  console.log(playOnUsers, "PLAYON")
  console.log(searchName, "SEARCHNAME")
  useEffect(() => {
    if (!playOnUsers) return;
    if (searchName) {
      setSearchResult(playOnUsers.length > 0 ? playOnUsers : "not-found");
    } else {
      setSearchResult(null);
    }
  }, [playOnUsers, searchName, setSearchResult]);

  return (
    <View style={style.searchBox}>
      <Ionicons
        name="person"
        size={20}
        color="white"
        style={{ marginLeft: 5 }}
      />
      <TextInput
        style={style.input}
        placeholder="Search a name"
        placeholderTextColor={"grey"}
        value={searchName ? searchName : ""}
        onChangeText={(inp) => setSearchName(inp || null)}
      />
      <Ionicons
        name="search"
        size={20}
        color="white"
        style={{ marginRight: 8 }}
      />
    </View>
  );
}

const style = StyleSheet.create({
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
