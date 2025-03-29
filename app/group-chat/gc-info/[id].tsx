import { ChatParams } from "@/types/params/ChatParams";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useState, useRef } from "react";
import NameChangeModal from "@/components/chat/gc-info/NameChangeModal";
import GcImageChangeModal from "@/components/chat/gc-info/GcImageChangeModal";
import GroupChatInfo from "@/components/chat/gc-info/GroupChatInfo";

export default function GroupChatInfoScreen() {
  const { id, name, profile } = useLocalSearchParams() as ChatParams;
  const [gcImage, setGcImage] = useState(profile);
  const [gcName, setGcName] = useState(name);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [newName, setNewName] = useState(gcName);

  // Image modal animation
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Name modal animation
  const centerModalScale = useRef(new Animated.Value(0.8)).current;
  const centerModalOpacity = useRef(new Animated.Value(0)).current;

  const openImageModal = () => {
    setShowImageModal(true);
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
      }),
    ]).start();
  };

  const openNameModal = () => {
    setNewName(gcName);
    setShowNameModal(true);
    Animated.parallel([
      Animated.timing(centerModalOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(centerModalScale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {/* Group chat Image and Name */}
      <View style={styles.columnCenter}>
        {/* Edit image */}
        <TouchableOpacity onPress={openImageModal}>
          <Image source={{ uri: gcImage }} style={styles.image} />
        </TouchableOpacity>
        {/* Edit gcname */}
        <TouchableOpacity style={styles.rowCenter} onPress={openNameModal}>
          <Text style={styles.gcName}>{gcName}</Text>
        </TouchableOpacity>
      </View>

      {/* Group chat info */}
      <GroupChatInfo id={id} />

      {/* Image selection modal */}
      <GcImageChangeModal
        showImageModal={showImageModal}
        setShowImageModal={setShowImageModal}
        setGcImage={setGcImage}
        fadeAnim={fadeAnim}
        slideAnim={slideAnim}
      />

      {/* Name change modal */}
      <NameChangeModal
        showNameModal={showNameModal}
        setShowNameModal={setShowNameModal}
        newName={newName}
        setNewName={setNewName}
        setGcName={setGcName}
        centerModalScale={centerModalScale}
        centerModalOpacity={centerModalOpacity}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 20,
    gap: 30,
  },
  columnCenter: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
  },
  gcName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
