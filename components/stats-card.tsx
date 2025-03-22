import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface StatsCardProps {
  activeMatches: number;
  gamesPlayed: number;
  onPressViewMatches: () => void;
}

export default function StatsCard({
  activeMatches,
  gamesPlayed,
  onPressViewMatches,
}: StatsCardProps) {
  return (
    <View style={styles.card}>
      <View>
        <View style={styles.activeMatchesContainer}>
          <Text style={styles.title}>Active Matches</Text>
          <Text style={styles.statNumber}>{activeMatches}</Text>
          <TouchableOpacity onPress={onPressViewMatches}>
            <Text style={styles.link}>View matches</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gamesPlayedContainer}>
          <Text style={styles.title}>Games played</Text>
          <Text style={styles.statNumber}>{gamesPlayed}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2C3333",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeMatchesContainer: {
    gap: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E7F6F2",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#A5C9CA",
  },
  link: {
    color: "#A5C9CA",
    textDecorationLine: "underline",
    fontSize: 14,
  },
  gamesPlayedContainer: {
    marginTop: 24,
  },
  label: {
    fontSize: 14,
    color: "#E7F6F2",
  },
});
