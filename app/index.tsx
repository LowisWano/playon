import { Text, View } from "react-native";

export default function Index() {
  // const x: any = 1; => gives typescript "any" type error

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
