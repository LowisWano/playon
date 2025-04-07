import { Messages } from '@/types/entities/InboxEntity';
import { convertToChatRoomTime } from '@/utils/time';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image } from 'react-native'

const dummyImage =
  "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";

// const imageIdentifier = "https://"

type MessagesProps = {
  message: Messages;
  userId: number;
  index: number;
  sender_name: string;
  type: "gc" | "uc"; // group chat or user chat
  lastMessage: boolean;
  isExceeds: boolean;
  isStillSender: boolean;
  loading: boolean;
};

type SeenByUserProps = {
  message: Messages; 
  type: string;
  lastMessage: boolean;
  userId: number;
}

export default function RoomMessages(props : MessagesProps) {
  
  const { 
    message, 
    userId, 
    index, 
    sender_name, 
    type, 
    lastMessage, 
    isExceeds,
    isStillSender,
    loading
  } = props;

  const { sender_id } = message;

  function displayTime() {
    if (isExceeds) {
      const time = convertToChatRoomTime(message.sent_at);
      return (
        <View style={styles.time}>
          <Text style={styles.text}>{time}</Text>
        </View>
      )
    }
    return null;
  }

  return (
    <View key={index} style={!isStillSender ? { marginBottom: 20 } : { marginBottom: 2}}>
      {/* Display time if last sent exceeds 30mins */}
      {displayTime()}
      {/* Display chat started if first  message in the chat room */}
      {index === 0 && (
        <Text style={styles.chatStarted}>
          {type === "gc" ? "Group chat created" : "Chat started"} 
          {'\n\n'}
          {convertToChatRoomTime(message.sent_at)} 
        </Text>
      )}
      {/* Message container */}
      <View style={[
        { flexDirection: "row", gap: 10 }, 
        sender_id === userId && { justifyContent: 'flex-end' }
      ]}>
        {/* display sender profile and if his still sender dont display */}
        {sender_id !== userId && !isStillSender ? (
          <Image
            source={{ uri: "mes" }}
            style={styles.profile}
          />
        ) : sender_id !== userId ? (
          <Image
            style={styles.wd}
          />
        ) : null}

        {/* Message */}
        <View style={styles.subContainer}>
          {type === "gc" && sender_id !== userId && !isStillSender && (
            <Text style={styles.sentByChatmateText}>
              {sender_name}
            </Text>
          )}
          {/* Message Content */}
          {message.content.startsWith("cloudinary-image") ? ( // kapoy na himo attribute
            <Image
              source={{ uri: dummyImage }}
              style={styles.imageSent}
            />
          ) : (
            <View style={[
              styles.sentByBoth, 
              sender_id === userId 
                ? { backgroundColor: "white" } 
                : { borderWidth: 1, borderColor: "white" }
            ]}>
              <Text style={
                sender_id === userId 
                ? { color: "black" } 
                : { color: "white" }
              }>
                {message.content}
              </Text>
            </View>
          )}
        </View>

        {/* Reply a message */}
        {/* {sender_id !== userId ? (
          <TouchableOpacity>
            <Ionicons 
              name="arrow-undo-outline" 
              size={15} 
              color="white"
            />
          </TouchableOpacity>
        ) : null} */}


      </View>
      {/* Display seen profiles */}
      <SeenByUser 
        message={message} 
        type={type} 
        lastMessage={lastMessage}
        userId={userId}
      />
      {/* Display loading means its still processing in BE or checking connections */}
      {loading && (
        <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
          <Text style={{color: 'white'}}>Sending...</Text>
        </View>
      )}
    </View>
  )
}

function SeenByUser({ message, type, lastMessage, userId } : SeenByUserProps) {
  
  const howManyDidRead = () => {
    let totalSeen = 0;
    message.read_messages.forEach(read => {
      if (read.is_read) totalSeen++;
    });
    if (totalSeen > 5) {
      return (
        <Text style={{ color: 'white', fontSize: 12 }}>
          +{message.read_messages.length - 5}
        </Text>
      )
    };
    return null
  } 

  return (
    <View style={styles.readMessages}>
        {/* typically how GC's "seen messages" in messenger works (to refactor)*/}
        {type === "gc" ? (
          message.read_messages.length > 5 && (
            howManyDidRead()
          ) ||
          message.read_messages.slice(0, 5).map((read, index) => (
            read.is_read && (
              <Image
                key={index}
                source={{ uri: "read."}}
                style={styles.seenProfile}
              />
            )
          ))
        ) : (
          // in user chat, only display the "seen" icon if the message is read and
          // is the last message and the sender is not the user
          lastMessage && 
          message.read_messages.length !== 0 &&
          message.read_messages[0].is_read && 
          message.sender_id !== userId && (
            <Ionicons 
              name="checkmark-done" 
              size={15} 
              color="white" 
            />
          )
        )}
      </View>
  )
}

const styles = StyleSheet.create({
  sentByYouContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  sentByBoth: {
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 12
  },
  sentByChatmateText: {
    color: "grey",
    padding: 5,
    fontSize: 12,
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "white",
    alignSelf: "flex-end",
  },
  seenProfile: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: "white",
    marginTop: 5,
    alignSelf: "flex-end",
  },
  userMessageContainer: { 
    flexDirection: "row", 
    gap: 10,
  },
  readMessages: {
    flexDirection: "row",
    gap: 2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  wd: {
    width: 30
  },
  time: { 
    flexDirection: "row", 
    justifyContent: 'center', 
    marginBottom: 15
  },
  text: { 
    color: 'white'
  },
  chatStarted: { 
    color: 'white', 
    textAlign: 'center', 
    marginBottom: 10, 
    flexDirection: 'column' 
  },
  subContainer: { 
    flexDirection: "column", 
    maxWidth: '70%' 
  },
  imageSent: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "white",
  }
});



// return (
//   <View key={index} style={{ flexDirection: "column", marginBottom: 20, width: '100%' }}>
//     <View
//       style={[
//         sender_id === userId
//           ? styles.sentByYouContainer
//           : { alignSelf: "flex-start" }
//       ]}
//     >
//       {/* if not equal to userId then display the sender else just the "seen" icon */}
//       {sender_id !== userId && (
//         <Text style={styles.sentByChatmateText}>
//           {sender_name}
//         </Text>
//       )}

//       <View style={[styles.userMessageContainer]}>
//         {/* If ur not the sender then display sender profile */}
//         {sender_id !== userId ? (
//           <Image
//             source={{ uri: "mes" }}
//             style={styles.profile}
//           />
//         ) : (
//           <Ionicons name="person-circle" size={15} color="white" />
//         )}
//         {/* Message background and border */}
//         <View
//           style={[
//             styles.sentByBoth,
//             sender_id === userId
//             ? { backgroundColor: "white" }
//             : { borderWidth: 1, borderColor: "white" },
//           ]}
//         >
//           <Text
//             style={[{ flexWrap: 'wrap' },
//               sender_id === userId
//                 ? { color: "black" }
//                 : { color: "white" }
//             ]}
//           >
//             {message.content} dwa dawdwa dawdawd awdaw dwa  dddddddddddddd aaaaaaaaaaaa
//           </Text>
//         </View>
//       </View>
//     </View>
//   </View>
// )