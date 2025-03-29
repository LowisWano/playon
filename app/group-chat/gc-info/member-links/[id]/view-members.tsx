import { useAuth } from "@/context/auth-context";
import { useGroupChatData } from "@/hooks/useGroupChatData";
import { ChatParams } from "@/types/params/ChatParams";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { useState } from "react";
import { GroupUserType } from "@/types/entities/InboxEntity";
import ViewMemberModal from "@/components/chat/gc-info/ViewMemberModal";

export default function ViewMembersScreen() {
  const { id: userId } = useAuth();
  const { id } = useLocalSearchParams() as ChatParams;
  const { gcMembers, admin, loading } = useGroupChatData(
    "view-members",
    Number(id),
    userId
  );

  const [selectedMember, setSelectedMember] = useState<GroupUserType | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  console.log(gcMembers);

  const handleMemberPress = (member: GroupUserType) => {
    setSelectedMember(member);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Text style={styles.text}>Members</Text>
        <Text style={styles.text}>({gcMembers?.length || 0})</Text>
      </View>

      {/* Member Container */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.text}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.memberContainer}>
          {gcMembers?.map((member) => (
            <View key={member.id} style={styles.member}>
              <TouchableOpacity
                style={styles.memberTouchable}
                onPress={
                  member.user_id === userId
                    ? () => {}
                    : () => handleMemberPress(member)
                }
              >
                <Image
                  source={{ uri: member.user.profile_pic }}
                  style={styles.image}
                />
                <Text style={styles.nameText}>
                  {member.user.first_name + " " + member.user.last_name}
                </Text>
                {member.user_id === (admin as number) ? (
                  <View style={styles.adminBadge}>
                    <Text style={styles.adminText}>Admin</Text>
                  </View>
                ) : null}
                {member.user_id === userId ? (
                  <View style={styles.adminBadge}>
                    <Text style={styles.adminText}>You</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Member Action Modal */}
      <ViewMemberModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedMember={selectedMember}
        isAdmin={admin === userId}
      />
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
  memberTouchable: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    flex: 1,
  },
});
