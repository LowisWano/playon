import { View, Text, TouchableOpacity, Modal, Image, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { GroupUserType } from '@/types/entities/InboxEntity';

const dummyImage =
  "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";

type ModalProps = {
  modalVisible: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  selectedMember: GroupUserType | null,
  isAdmin: boolean,
}

export default function ViewMemberModal(props: ModalProps) {
  const { modalVisible, setModalVisible, selectedMember, isAdmin } = props;
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;


  // Closing animation
  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,  // Faster fade out
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 100,  // Faster slide down
        useNativeDriver: true,
      })
    ]).start(() => setModalVisible(false));
  };
  
  // Opening animation
  useEffect(() => {
    if (modalVisible) {
      fadeAnim.setValue(0);
      slideAnim.setValue(300);
      
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
  }, [modalVisible, fadeAnim, slideAnim]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        {/* Background with fade animation */}
        <Animated.View 
          style={[
            styles.modalBackground,
            { opacity: fadeAnim }
          ]}
        >
          <TouchableOpacity 
            style={styles.modalBackgroundTouchable}
            activeOpacity={1}
            onPress={closeModal}
          />
        </Animated.View>
        
        {/* Content with slide animation */}
        <Animated.View 
          style={[
            styles.modalContainer,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          {selectedMember && (
            <>
              <View style={styles.modalHeader}>
                <Image 
                  source={{ uri: selectedMember.user.profile_pic || dummyImage }} 
                  style={styles.modalImage} 
                />
                <Text style={styles.modalName}>
                  {selectedMember.user.first_name + " " + selectedMember.user.last_name}
                </Text>
              </View>
          
                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => {
                      closeModal();
                      // Handle view profile
                    }}
                  >
                    <Ionicons 
                      name="person-outline" 
                      size={24} 
                      color="white" 
                    />
                    <Text style={styles.actionText}>View Profile</Text>
                  </TouchableOpacity>
                  
                  {/* If admin then have this functionalties */}
                  {isAdmin ? (
                    <>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => {
                        closeModal();
                        // Handle transfer admin
                      }}
                    >
                      <Ionicons 
                        name="shield-outline" 
                        size={24} 
                        color="white" 
                      />
                      <Text style={styles.actionText}>Transfer Admin</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.dangerAction]}
                      onPress={() => {
                        closeModal();
                        // Handle kick member
                      }}
                    >
                      <Ionicons 
                        name="remove-circle-outline" 
                        size={24} 
                        color="red" 
                      />
                      <Text style={[styles.actionText, styles.dangerText]}>Kick Member</Text>
                    </TouchableOpacity>
                    </>
                  ) : null}
                </View>
              
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={closeModal}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  )
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
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});