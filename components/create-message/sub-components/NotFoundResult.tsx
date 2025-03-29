import { View, Text, StyleSheet } from 'react-native';


export function NotFoundResult() {
  return (
    <View style={style.notFoundContainer}>
      <Text style={style.notFoundText}>No results found</Text>
      <Text style={style.notFoundSubText}>
        User doesn&apos;t exist or Try again with different spelling.
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  notFoundText: {
    color: "white",
    padding: 8,
    fontWeight: "500",
  },
  notFoundSubText: {
    textAlign: "center",
    paddingLeft: 24,
    paddingRight: 24,
    color: "grey",
  },
});