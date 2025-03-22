import { View, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SearchNameResultProps = {
  searchName: string | null;
  setSearchName: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function SearchName({ searchName, setSearchName }: SearchNameResultProps) {
  return (
    <View style={style.searchBox}>
      <Ionicons name="person" size={20} color="white" style={{ marginLeft: 5 }} />
      <TextInput
        style={style.input}
        placeholder="Search a name"
        placeholderTextColor={"grey"}
        value={searchName ? searchName : ""}
        onChangeText={setSearchName}
      />
      <Ionicons name="search" size={20} color="white" style={{ marginRight: 8 }} />
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
