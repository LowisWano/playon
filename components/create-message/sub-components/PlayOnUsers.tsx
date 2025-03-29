import { RoomUserData } from "../../../types/entities/UserEntity";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { UserProfileModal } from "./ViewUserModal";
import { useGroupChatInfo } from "@/hooks/useGroupChatInfo";
import { useAuth } from "@/context/auth-context";

type PlayOnUsersParams = {
  users: RoomUserData[];
  route: string;
  setAddUsers?: React.Dispatch<React.SetStateAction<RoomUserData[]>>;
};

const room_id = 2451; // create a uuid for random room id

export function PlayOnUsers({ users, route, setAddUsers }: PlayOnUsersParams) {
  const [checkedUsers, setCheckedUsers] = useState<{[key: string]: boolean}>({});
  const [selectedUser, setSelectedUser] = useState<RoomUserData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { id: userId } = useAuth();
  const { startDirectMessage, loading, successMessage } = useGroupChatInfo(-1, userId)

  const handleSendMessage = async (message: string) => {
    console.log(`Message to ${selectedUser?.username}:`, message);
    // Implement your message sending logic here
    await startDirectMessage(
      message, 
      selectedUser?.sender_id as number, 
      userId, 
      room_id
    );
  };

  console.log(loading, "LOADING", successMessage, "SUCCESS MESSAGE");

  if (users.length === 0) {
    return (
      <View style={style.notFoundContainer}>
        <Text style={style.notFoundText}>No contacts found</Text>
        <Text style={style.notFoundSubText}>
          No contacts found as you don&apos;t have any current contacts or all contacts are in the group chat.
        </Text>
      </View>
    )
  }

  console.log(checkedUsers, "CHECKED USERS");

  return (
    <>
      {users.map((u, i) => (
        <View key={i} style={{ marginTop: 5 }}>
          <TouchableOpacity
            style={style.resultContainer}
            onPress={() => {
              if (route === "create-group" && setAddUsers) {
                const newCheckedState = !checkedUsers[u.sender_id as number];
                setCheckedUsers(prev => ({...prev, [u.sender_id as number]: newCheckedState}));
                
                if (newCheckedState) {
                  setAddUsers((prev) => [...prev, u]);
                } else {
                  setAddUsers((prev) => prev.filter((user) => user.sender_id !== u.sender_id));
                }
              } else if (route === "create-message" && u.room_id) {
                router.navigate({
                  pathname: "/user-chat/[id]",
                  params: {
                    id: u.room_id as number,
                    name: u.username,
                    profile: u.profile_pic,
                  },
                });
              } else if (route === "create-message" && !u.room_id) {
                setSelectedUser(u);
                setModalVisible(true);
              }
            }}
          >
            <Image 
              source={{ uri: u.profile_pic }} 
              style={style.image} 
            />
            <Text style={style.nameText}>{u.username}</Text>
            {route === "create-group" && (
              <BouncyCheckbox
                size={18}
                fillColor="green"
                unFillColor="#FFFFFF"
                iconStyle={{ borderColor: "grey" }}
                isChecked={checkedUsers[u.sender_id as number] || false}
                style={{ marginLeft: "auto", marginRight: -8 }}
              />
            )}
          </TouchableOpacity>
        </View>
      ))}

      <UserProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        user={{
          username: selectedUser?.username || '',
          profile_pic: selectedUser?.profile_pic || '',
          sender_id: selectedUser?.sender_id || 0,
        }}
        onSendMessage={handleSendMessage}
      />
    </>
  );
}



// export function TestContacts({ route }: { route: string }) {
//   const [isChecked, setIsChecked] = useState(false);

//   return (
//     <View style={{ marginTop: 5 }}>
//       <TouchableOpacity
//         style={style.resultContainer}
//         onPress={() => {
//           if (route === "create-group") {
//             setIsChecked(!isChecked);
//           } else if (route === "create-message") {
//             router.navigate({
//               pathname: "/user-chat/[id]",
//               params: {
//                 id: 1,
//                 name: "username,",
//                 profile: " u.profile_pic",
//               },
//             });
//           }
//         }}
//       >
//         <Image source={{ uri: testImage }} style={style.image} />
//         <Text style={style.nameText}>John Doe</Text>
//         {route === "create-group" && (
//           <BouncyCheckbox
//             size={18}
//             fillColor="green"
//             unFillColor="#FFFFFF"
//             iconStyle={{ borderColor: "grey" }}
//             isChecked={isChecked}
//             style={{ marginLeft: "auto", marginRight: -8 }}
//           />
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

const style = StyleSheet.create({
  labelText: {
    color: "grey",
    fontWeight: "500",
  },
  nameText: {
    color: "white",
    fontSize: 15,
    marginLeft: 8,
    padding: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  notFoundText: {
    color: "white",
    padding: 8,
    fontWeight: "500",
  },
  notFoundSubText: {
    textAlign: "center",
    paddingLeft: 24,
    paddingRight: 24,
    color: "grey",
  },
});
