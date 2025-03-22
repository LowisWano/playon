import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface MatchCardCompactProps {
  sport: string;
  author: string;
  venue: string;
  skillLevel: string;
  dateTime: string;
  participantsCount: number;
  description?: string;
}

export default function MatchCardCompact({
  sport,
  author,
  venue,
  skillLevel,
  dateTime,
  participantsCount,
  description = '',
}: MatchCardCompactProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/match' as const,
      params: {
        sport,
        author,
        venue,
        skillLevel,
        dateTime,
        participantsCount,
        description,
      },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <LinearGradient
        colors={["#95C96F", "#27A084"]}
        style={styles.card}
      >
        <View style={styles.topRow}>
          <View style={styles.profilePicture} />
          <View style={styles.sportInfo}>
            <Text style={styles.sport}>{sport}</Text>
            <Text style={styles.author}>{author}</Text>
          </View>
        </View>

        <View style={styles.skillRow}>
          <View style={styles.sportIconContainer}>
            <Ionicons name="basketball-outline" size={26} color="#ffffff" />
          </View>
          <View style={styles.skillLevelContainer}>
            <Text style={styles.skillLevel}>{skillLevel}</Text>
            <Text style={styles.participants}>{participantsCount} going</Text>
          </View>
        </View>

        <Text style={styles.dateTime}>{dateTime}</Text>
        <Text style={styles.venue}>{venue}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    width: 142,
    height: 163,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skillLevelContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 12,
  },
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  sportInfo: {
    flex: 1,
  },
  sport: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  author: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sportIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  skillLevel: {
    fontSize: 12,
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  participants: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  dateTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  venue: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});
