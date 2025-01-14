import { Text, View } from "react-native";
import React from "react";

export default function Index() {
  
  const x : number = 1;

  console.log(x);
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
