import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

type Icons = "person-add" | "people" | "checkmark-done";
type Routes = "add-members" | "view-members" | "member-requests";

export default function GroupChatInfo({ id }: { id: string }) {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.gcInfo}>Group chat info</Text>      
      <View style={styles.columnStart}>
        {[
          { text: "Add Members", icon: "person-add", path: "add-members" },
          { text: "View Members", icon: "people", path: "view-members" },
          { text: "Member Request", icon: "checkmark-done", path: "member-requests" },
        ].map((item, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.rowCenter}
            onPress={() => {
              router.push({
                pathname: `/group-chat/gc-info/member-links/[id]/${item.path as Routes}`,
                params: { id: id }
              })
            }}
          >
            <Ionicons
              name={item.icon as Icons} 
              size={20} 
              color="white" 
            />
            <Text style={styles.whiteText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>  
    </View>
  )
}

const styles = StyleSheet.create({
  whiteText: {
    color: "white",
    fontSize: 16
  },
  infoContainer: {
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    gap: 20, 
    justifyContent: 'flex-start'
  },
  gcInfo: {
    color: 'gray', 
    fontWeight: '500'
  },
  columnStart: {
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    gap: 30
  },
  rowCenter: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10
  },
})