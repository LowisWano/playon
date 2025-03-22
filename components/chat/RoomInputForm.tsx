import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

type InputFormProps = {
  pickImage: () => Promise<void>;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  inputMessage: string;
  wsConnection: WebSocket | null;
  image: string;
  uploadImage: () => Promise<"data" | undefined>;
};

export default function RoomInputForm(props: InputFormProps) {
  const {
    pickImage,
    setInputMessage,
    inputMessage,
    wsConnection,
    // image,
    // uploadImage
  } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.chooseImageButton} onPress={pickImage}>
        <Ionicons name="image" size={28} color="white" />
      </TouchableOpacity>
      <View style={styles.inputForm}>
        <TextInput
          style={styles.inputField}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            if (wsConnection && inputMessage.trim()) {
              wsConnection.send(inputMessage);
              setInputMessage("");
            }
          }}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 10,
    alignItems: "center",
  },
  chooseImageButton: {
    borderRadius: 8,
    marginRight: 20,
  },
  inputForm: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    flex: 1,
    borderRadius: 24,
    borderColor: "white",
  },
  inputField: {
    padding: 8,
    flex: 1,
    marginLeft: 10,
    color: "white",
    outline: "none",
  },
  sendButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});
