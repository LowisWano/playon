import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';

type UserProfileModalProps = {
  visible: boolean;
  onClose: () => void;
  user: {
    username: string;
    profile_pic: string;
    sender_id: number;
  };
  onSendMessage: (message: string) => void;
};

export function UserProfileModal({ visible, onClose, user, onSendMessage }: UserProfileModalProps) {
  const [message, setMessage] = useState('');
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
    ]).start(onClose);
  };

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(300);
      fadeAnim.setValue(0);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
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
        
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.modalHeader}>
            <Image 
              source={{ uri: user.profile_pic }} 
              style={styles.modalImage} 
            />
            <Text style={styles.modalName}>{user.username}</Text>
          </View>
          
          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => {
                closeModal();
                // Handle view profile
              }}
            >
              <Ionicons name="person-outline" size={24} color="white" />
              <Text style={styles.actionText}>View Profile</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.messageInputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              placeholderTextColor="#888"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={() => {
                onSendMessage(message);
                setMessage('');
                closeModal();
              }}
              disabled={!message.trim()}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={!message.trim() ? "grey" : "white"} 
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  modalHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  modalName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  modalActions: {
    gap: 15,
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  messageInput: {
    flex: 1,
    color: 'white',
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 10,
    padding: 8,
  },
});