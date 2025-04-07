import { View, Text, Modal, Animated, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { InboxChatmates } from '@/types/entities/InboxEntity';

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChat: InboxChatmates | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<InboxChatmates | null>>
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export default function ChatmateHoldModal(props: ModalProps) {

  const { 
    modalVisible, 
    setModalVisible, 
    selectedChat, 
    setSelectedChat, 
    fadeAnim, 
    slideAnim 
  } = props;

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start(() => setModalVisible(false));
    
    setTimeout(() => {
      setSelectedChat(null); // prevent buggy behavior
    }, 200)
  };

  const handleAction = (action: string) => {
    console.log(`${action} for chat:`, selectedChat?.name);
    closeModal();
    // Implement logic here
  };

  console.log(selectedChat, "SELECTED CHAT");
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalBackground, { opacity: fadeAnim }]}>
          <TouchableOpacity 
            style={styles.modalBackgroundTouchable}
            activeOpacity={1}
            onPress={closeModal}
          />
        </Animated.View>
        
        <Animated.View style={[
            styles.modalContainer, 
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          {selectedChat?.type === "direct" ? (
            <>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleAction("viewProfile")}
              >
                <Ionicons 
                  name="person-outline" 
                  size={24} 
                  color="white" 
                />
                <Text style={styles.actionText}>View Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, selectedChat.isRead && { opacity: 0.5 }]}
                onPress={() => handleAction("markAsRead")}
                disabled={selectedChat?.isRead}
              >
                <Ionicons 
                  name="mail-open-outline" 
                  size={24} 
                  color="white" 
                />
                <Text style={styles.actionText}>Mark as Read</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity 
                style={[
                  styles.actionButton, 
                  styles.dangerAction, 
                  { justifyContent: 'space-between' }
                ]}
                onPress={() => handleAction("leaveGroup")}
              >
                <View 
                  style={[
                    styles.leaveGc, 
                    selectedChat?.isGcAdmin ? { opacity: 0.5 } : null
                  ]}
                >  
                  <Ionicons 
                    name="exit-outline" 
                    size={24} 
                    color="red" 
                  />
                  <Text style={[
                      styles.actionText, 
                      styles.dangerText
                    ]}
                  >
                    Leave Group Chat
                  </Text>
                </View>
                {selectedChat?.isGcAdmin ? (
                  <View>
                    <Text style={styles.dangerText}>
                      You&apos;re an admin
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleAction("muteGroup")}
              >
                <Ionicons 
                  name={
                    selectedChat?.isGcMuted 
                    ? "notifications-off-outline"
                    : "notifications-outline"
                  } 
                  size={24} 
                  color="white" 
                />
                <Text style={styles.actionText}>
                  {selectedChat?.isGcMuted ? "Unmute group chat" : "Mute group chat"}
                </Text>
              </TouchableOpacity>
            </>
          )}
          
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={closeModal}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  // Add these new styles for the modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBackgroundTouchable: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
    marginBottom: 10,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
  },
  dangerAction: {
    backgroundColor: '#2A1E1E',
  },
  dangerText: {
    color: 'red',
  },
  cancelButton: {
    backgroundColor: '#2A2A2A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  leaveGc: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 15 
  }
})