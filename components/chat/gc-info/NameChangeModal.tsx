import { 
  View, 
  Text, 
  Modal, 
  TextInput, 
  TouchableOpacity,
  Animated, 
  StyleSheet
} from 'react-native'

type NameChangeModalProps = {
  showNameModal: boolean;
  setShowNameModal: React.Dispatch<React.SetStateAction<boolean>>;
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>
  setGcName: React.Dispatch<React.SetStateAction<string>>;
  centerModalScale: Animated.Value;
  centerModalOpacity: Animated.Value;
}

export default function NameChangeModal(props: NameChangeModalProps) {

  const { 
    showNameModal, 
    setShowNameModal,
    newName, 
    setNewName, 
    setGcName,
    centerModalScale,
    centerModalOpacity,
  } = props;

  const closeNameModal = () => {
    Animated.parallel([
      Animated.timing(centerModalOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(centerModalScale, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start(() => setShowNameModal(false));
  };

  const handleNameChange = () => {
    if (newName.trim()) {
      setGcName(newName.trim());
      // call api
    }
    closeNameModal();
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={showNameModal}
      onRequestClose={closeNameModal}
    >
      <View style={styles.centerModalOverlay}>
        <Animated.View style={[
          styles.centerModalBackground, 
            { opacity: centerModalOpacity }
          ]}
        >
          <TouchableOpacity 
            style={styles.centerModalBackgroundTouchable}
            activeOpacity={1}
            onPress={closeNameModal}
          />
        </Animated.View>
        
        <Animated.View style={[
          styles.centerModalContainer,
          { 
            opacity: centerModalOpacity,
            transform: [{ scale: centerModalScale }] 
          }
        ]}>
          <Text style={styles.centerModalTitle}>Change Group Name</Text>
          <TextInput
            style={styles.nameInput}
            value={newName}
            onChangeText={setNewName}
            placeholder="Enter group name"
            placeholderTextColor="#888"
            autoFocus
            maxLength={25}
          />
          <View style={styles.nameModalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelNameButton]}
              onPress={closeNameModal}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.changeNameButton]}
              onPress={handleNameChange}
              disabled={!newName.trim()}
            >
              <Text style={styles.modalButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centerModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerModalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centerModalBackgroundTouchable: {
    flex: 1,
  },
  centerModalContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 20,
    width: '80%',
  },
  centerModalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  nameInput: {
    backgroundColor: '#2A2A2A',
    color: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  nameModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: '45%',
    alignItems: 'center',
  },
  cancelNameButton: {
    backgroundColor: '#2A2A2A',
  },
  changeNameButton: {
    backgroundColor: '#4A6FA5',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})