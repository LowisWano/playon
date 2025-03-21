import { View, StyleSheet, TextInput } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { LatestChatmatesProps } from '@/types/props/MessagesProps';

export default function OnlineChatmates({ data, inboxData, isLoading }: LatestChatmatesProps) {
  return (
    <View style={styles.searchContainer}>
        <TextInput
            placeholder="Search Messages"
            placeholderTextColor="gray"
            style={styles.searchBar}
        />
        <Ionicons
            name="search" 
            size={22} 
            color="white" 
            style={{position: 'absolute', right: 15, top: 8}} 
        />
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer:{
    height: 45,
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    color: '#fff',
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    marginBottom: 10,
  },
  searchBar:{
    color: 'white',
    padding: 0,
    paddingLeft: 10,
    paddingRight: 35,
    fontSize: 16,
    outline: 'none',
  },
});
