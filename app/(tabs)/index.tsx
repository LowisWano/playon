import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import MatchCard from "../../components/match-card";
import MatchCardCompact from "../../components/match-card-compact";
import StatsCard from "../../components/stats-card";
import { matchService } from "../../services/match.service";
import { Match } from "@/types/match.types";

export default function Index() {
  // Sample data - Replace with actual data from your backend
  const [activeMatches, setActiveMatches] = useState<Match[]>([]);
  const [recommendedMatches, setRecommendedMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [active, recommended] = await Promise.all([
          matchService.getActiveMatches(),
          matchService.getRecommendedMatches(),
        ]);
        setActiveMatches(active);
        setRecommendedMatches(recommended);
      } catch (error) {
        console.error("Error fetching matches:", error);
        // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

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

          {recommendedMatches.map((match, index) => (
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
    backgroundColor: "#252422",
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
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});
