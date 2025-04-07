
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity,
  Animated, 
  Image,
  StyleSheet,
} from 'react-native'

// Default icons for group chat
const defaultIcons = [
  "require('@/assets/images/gc-icon1.png')",
  "require('@/assets/images/gc-icon2.png')",
  "require('@/assets/images/gc-icon3.png')",
  "require('@/assets/images/gc-icon4.png')",
  "require('@/assets/images/gc-icon5.png')",
  "require('@/assets/images/gc-icon6.png')",
];

type GcImageChangeModalProps = {
  showImageModal: boolean;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  setGcImage: React.Dispatch<React.SetStateAction<string>>;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export default function GcImageChangeModal(props: GcImageChangeModalProps) {

  const { 
    showImageModal, 
    setShowImageModal,
    setGcImage,
    fadeAnim,
    slideAnim,
  } = props;

  const closeImageModal = () => {
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
    ]).start(() => setShowImageModal(false));
  };


  const selectIcon = (icon: string) => {
    setGcImage(icon);
    closeImageModal();
    // call api to update image
  };

  return (
    <Modal
        animationType="none"
        transparent={true}
        visible={showImageModal}
        onRequestClose={closeImageModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={
            [styles.modalBackground, 
              { opacity: fadeAnim }
            ]
          }>
            <TouchableOpacity 
              style={styles.modalBackgroundTouchable}
              activeOpacity={1}
              onPress={closeImageModal}
            />
          </Animated.View>
          
          <Animated.View style={
            [styles.imageModalContainer, 
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <Text style={styles.modalTitle}>Choose Group Icon</Text>
            <View style={styles.iconGrid}>
              {defaultIcons.map((icon, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectIcon(icon)}
                  style={styles.iconContainer}
                >
                  <Image 
                    source={{uri: icon}} 
                    style={styles.iconImage} 
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={closeImageModal}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
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
  imageModalContainer: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconContainer: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
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