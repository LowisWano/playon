import AutoApprove from "@/components/chat/gc-info/AutoApprove";
import { useAuth } from "@/context/auth-context";
import { useGroupChatData } from "@/hooks/useGroupChatData";
import { ChatParams } from "@/types/params/ChatParams";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function MemberRequestScreen() {
  const { id: userId } = useAuth();
  const { id } = useLocalSearchParams() as ChatParams;

  const { pendingMembers, loading } = useGroupChatData(
    "member-requests",
    Number(id),
    userId
  );

  console.log(pendingMembers, "PENDING MEMBERS");

  return (
    <View style={styles.container}>
      {/* Auto approve */}
      <AutoApprove />

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Text style={styles.text}>Members</Text>
        <Text style={styles.text}>({pendingMembers?.length || 0})</Text>
      </View>

      {/* Member Container */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.text}>Loading...</Text>
        </View>
      ) : pendingMembers.length > 0 ? (
        <View style={styles.memberContainer}>
          {pendingMembers?.map((member) => (
            <View key={member.id} style={styles.member}>
              <View style={styles.memberView}>
                <Image
                  source={{ uri: member.user.profile_pic }}
                  style={styles.image}
                />
                <Text style={styles.nameText}>
                  {member.user.first_name + " " + member.user.last_name}
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 15 }}>
                <TouchableOpacity
                  onPress={() => {
                    // Handle Approve member
                  }}
                >
                  <Ionicons name="checkmark" size={24} color="green" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.noPending}>
          <Text style={styles.text}>No pending members</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  text: {
    color: "grey",
    fontSize: 14,
    fontWeight: "500",
  },
  noPending: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
  },
  nameText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
    flex: 1,
  },
  member: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  adminBadge: {
    backgroundColor: "#3A3A3A",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  adminText: {
    color: "lightgrey",
    fontSize: 12,
  },
  memberContainer: {
    marginTop: 10,
    gap: 20,
  },
  memberView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    flex: 1,
  },
});
