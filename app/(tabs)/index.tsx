import { Text, View, StyleSheet, ScrollView } from "react-native";
import MatchCard from "../../components/match-card";
import MatchCardCompact from "../../components/match-card-compact";
import StatsCard from "../../components/stats-card";
export default function Index() {
  // Sample data - Replace with actual data from your backend
  const activeMatches = [
    {
      sport: "Basketball",
      author: "John Doe",
      venue: "Central Park Court",
      skillLevel: "Intermediate",
      dateTime: "2024-03-25 18:00",
      participantsCount: 8,
      description:
        "Join us for a fun game of basketball at Central Park Court. We'll have a great time playing and getting to know each other. Bring your friends and come ready to play!",
    },
    {
      sport: "Soccer",
      author: "Jane Smith",
      venue: "Community Field",
      skillLevel: "Advanced",
      dateTime: "2024-03-26 17:30",
      participantsCount: 12,
      description:
        "Join us for a fun game of soccer at Community Field. We'll have a great time playing and getting to know each other. Bring your friends and come ready to play!",
    },
    {
      sport: "Basketball",
      author: "John Doe",
      venue: "Central Park Court",
      skillLevel: "Intermediate",
      dateTime: "2024-03-25 18:00",
      participantsCount: 8,
      description:
        "Join us for a fun game of basketball at Central Park Court. We'll have a great time playing and getting to know each other. Bring your friends and come ready to play!",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.section}>
          <StatsCard
            activeMatches={activeMatches.length}
            gamesPlayed={activeMatches.length}
            onPressViewMatches={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Matches</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.activeMatchList}
          >
            {activeMatches.map((match, index) => (
              <View key={index} style={styles.compactCardContainer}>
                <MatchCardCompact {...match} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended</Text>

          {activeMatches.map((match, index) => (
            <MatchCard key={index} {...match} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  content: {
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
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  activeMatchList: {
    paddingHorizontal: 8,
    gap: 12,
  },
  compactCardContainer: {
    marginVertical: 8,
  },
  recommendedList: {
    flex: 1,
  },
});
