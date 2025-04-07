import { View, TouchableOpacity, TextInput, StyleSheet, Text, Image, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";

const dummyImage =
  "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";

type InputFormProps = {
  pickImage: () => Promise<void>;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  inputMessage: string;
  wsConnection: WebSocket | null;
  image: string;
  uploadImage: () => Promise<"data" | undefined>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sentTo: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  // profile: string;
};

export default function RoomInputForm(props: InputFormProps) {
  const [message, setMessage] = useState("");
  
  const {
    pickImage,
    setInputMessage,
    inputMessage,
    wsConnection,
    setLoading,
    sentTo,
    image,
    setImage,
    // uploadImage,
  } = props;

  const handleSendMessage = () => {

    if (wsConnection && (inputMessage.trim() || image)) {
      setLoading(true);

      if(image) {
        // upload to cloudinary and fetch its url
        setInputMessage("") // set to cloudinary uri
        console.log("Image sent");
      }
      wsConnection.send(
        JSON.stringify({
          msg: inputMessage, 
          to: sentTo
        }
      ));
      setInputMessage("");
      setImage("");
      // The loading will be set to false in the useChatRoom hook after broadcast
    } else{
      setMessage("Please check your connection...");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }

  const showImage = () => {
    if(image) {
      return (
        <View style={styles.showImageContainer}>
          <Pressable 
            style={styles.pressable} 
            onPress={() => setImage("")}
            android_ripple={{ color: "white" }}
          >
            <Ionicons 
              name="close-circle" 
              size={24} 
              color="white"
            />
          </Pressable>
          <Image 
            source={{ uri: dummyImage}} 
            style={styles.image} 
          />
        </View>
      )
    }
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.chooseImageButton} 
        onPress={pickImage}
      >
        <Ionicons 
          name="image" 
          size={28} 
          color="white" 
        />
      </TouchableOpacity>
      <View style={styles.inputForm}>
        {/* show Image */}
        {showImage()}
        <TextInput
          style={styles.inputField}
          value={inputMessage}
          onChangeText={setInputMessage}
          aria-disabled={image !== ""}
          placeholder={!image ? "Type a message..." : "Send image"}
          placeholderTextColor="grey"
        />
        <TouchableOpacity
          style={styles.sendButton}
          disabled={!wsConnection || (!inputMessage.trim() && !image)}
          onPress={handleSendMessage}
        >
          <Ionicons 
            name="send" 
            size={24} 
            color={!wsConnection || (!inputMessage.trim() && !image) 
              ? "grey" 
              : "white"
            } 
          />
        </TouchableOpacity>
      </View>
      {message ? (
        <View style={styles.error}>
          <Text style={styles.errorText}>{message}</Text>
        </View>
      ) : null}
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
  },
  sendButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  error: {
    position: "absolute", 
    bottom: 50,
    backgroundColor: '#323332',
    padding: 10,
    opacity: 0.8,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%'
  },
  errorText: {
    color: 'white', 
    textAlign: 'center', 
    fontSize: 14
  },
  showImageContainer: { 
    position: "absolute", 
    left: 10, 
    bottom: 60 
  },
  pressable: { 
    right: 12, 
    bottom: -16, 
    zIndex: 1 
  },
  image: { 
    width: 70, 
    height: 70, 
    backgroundColor: "white",
  },
});
