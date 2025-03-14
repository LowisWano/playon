import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { useAuth } from "../../context/auth-context";
import MatchCard from "../../components/match-card";

export default function Index() {
  const { logout } = useAuth();

  // Sample data - Replace with actual data from your backend
  const activeMatches = [
    {
      sport: "Basketball",
      author: "John Doe",
      venue: "Central Park Court",
      skillLevel: "Intermediate",
      dateTime: "2024-03-25 18:00",
      participantsCount: 8,
    },
    {
      sport: "Soccer",
      author: "Jane Smith",
      venue: "Community Field",
      skillLevel: "Advanced",
      dateTime: "2024-03-26 17:30",
      participantsCount: 12,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended</Text>
        <ScrollView style={styles.matchList}>
          {activeMatches.map((match, index) => (
            <MatchCard key={index} {...match} />
          ))}
        </ScrollView>
      </View>

      <Pressable style={styles.logoutButton} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 48,
    marginBottom: 24,
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  matchList: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
