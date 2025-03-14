import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface MatchPageProps {
  sport: string;
  author: string;
  venue: string;
  skillLevel: string;
  dateTime: string;
  participantsCount: number;
  description: string;
}

export default function MatchPage({
  sport,
  author,
  venue,
  skillLevel,
  dateTime,
  participantsCount,
  description,
}: MatchPageProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </Pressable>

      <View style={styles.banner}>
        <View style={styles.bannerOverlay} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.sport}>{sport}</Text>
          <Text style={styles.skillLevel}>{skillLevel}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>{dateTime}</Text>
          <Text style={styles.label}>{venue}</Text>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.authorSection}>
          <Text style={styles.sectionTitle}>Organizer</Text>
          <View style={styles.authorInfo}>
            <View style={styles.profilePicture} />
            <Text style={styles.authorName}>{author}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.participants}>{participantsCount} going</Text>
          <Pressable style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Now</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  banner: {
    height: 200,
    backgroundColor: '#DAF7A6',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sport: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  skillLevel: {
    fontSize: 16,
    color: '#A5C9CA',
    backgroundColor: '#3A4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#A5C9CA',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#A5C9CA',
    lineHeight: 24,
  },
  authorSection: {
    marginBottom: 24,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#A5C9CA',
  },
  authorName: {
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 'auto',
  },
  participants: {
    fontSize: 16,
    color: '#A5C9CA',
  },
  joinButton: {
    backgroundColor: '#A5C9CA',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#25292e',
  },
});
