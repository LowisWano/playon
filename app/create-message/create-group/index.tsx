import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const testImage =
  "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";

export default function Index() {
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
        />
        <Ionicons
          name="search"
          size={20}
          color="white"
          style={{ marginRight: 8 }}
        />
      </View>

      {/* SCROLL VIEWW */}
      <ScrollView style={{ marginTop: 16 }}>
        <Text style={{ color: "grey", fontWeight: "500" }}>Add members</Text>

        <View style={{ marginTop: 5 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", padding: 8 }}
          >
            <Image source={{ uri: testImage }} style={style.image} />
            <Text style={style.text}>John Doe</Text>
            <BouncyCheckbox
              size={18}
              fillColor="green"
              unFillColor="#FFFFFF"
              iconStyle={{ borderColor: "grey" }}
              onPress={(isChecked: boolean) => {
                console.log(isChecked);
              }}
              style={{ marginLeft: "auto", marginRight: -8 }}
            />
          </TouchableOpacity>
        </View>

        {/* <--! When Search name triggers --> */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 40,
          }}
        >
          <Text style={{ color: "white", padding: 8, fontWeight: "500" }}>
            No results found
          </Text>
          <Text
            style={{
              textAlign: "center",
              paddingLeft: 24,
              paddingRight: 24,
              color: "grey",
            }}
          >
            User doesn&apos;t exist or Try again with different spelling.
          </Text>
        </View>
      </ScrollView>
      {/* SCROLL VIEWW */}
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
