import { View, Text, StyleSheet } from 'react-native';

interface MatchCardProps {
  sport: string;
  author: string;
  venue: string;
  skillLevel: string;
  dateTime: string;
  participantsCount: number;
}

export default function MatchCard({
  sport,
  author,
  venue,
  skillLevel,
  dateTime,
  participantsCount,
}: MatchCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.profileSection}>
        <View style={styles.profilePicture} />
      </View>

      <View style={styles.details}>
        <Text style={styles.sport}>{sport}</Text>
        <Text style={styles.label}>Posted by {author}</Text>
        <Text style={styles.label}>{dateTime}</Text>
        <Text style={styles.label}>{venue}</Text>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.skillLevel}>{skillLevel}</Text>
        <Text style={styles.participants}>{participantsCount} going</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2C3333',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileSection: {
    width: 50,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#A5C9CA',
  },
  details: {
    flex: 1,
    gap: 4,
  },
  statsSection: {
    alignItems: 'flex-end',
    gap: 4,
  },
  sport: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  skillLevel: {
    fontSize: 14,
    color: '#A5C9CA',
    backgroundColor: '#3A4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  participants: {
    fontSize: 14,
    color: '#A5C9CA',
  },
  label: {
    fontSize: 14,
    color: '#A5C9CA',
  },
});