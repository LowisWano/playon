import { Text, View, StyleSheet } from "react-native";

export default function ActivitiesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Activities screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252422",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
