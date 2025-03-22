import { BasicUserData } from "../../../types/entities/User";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const testImage =
  "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";

type PlayOnUsersParams = {
  users: BasicUserData[];
  route: string;
  setAddUsers?: React.Dispatch<React.SetStateAction<BasicUserData[]>>;
};

export function NotFoundResult() {
  return (
    <View style={style.notFoundContainer}>
      <Text style={style.notFoundText}>No results found</Text>
      <Text style={style.notFoundSubText}>
        User doesn&apos;t exist or Try again with different spelling.
      </Text>
    </View>
  );
}

export function PlayOnUsers({ users, route, setAddUsers }: PlayOnUsersParams) {
  const [isChecked, setIsChecked] = useState(false);

  return users.map((u) => (
    <View style={{ marginTop: 5 }} key={u.id}>
      <TouchableOpacity
        style={style.resultContainer}
        onPress={() => {
          if (route === "create-group" && setAddUsers) {
            setIsChecked(!isChecked);
            if (!isChecked) {
              setAddUsers((prev) => prev.filter((user) => user.id !== u.id));
            } else {
              setAddUsers((prev) => [...prev, u]);
            }
          } else if (route === "create-message") {
            router.navigate({
              pathname: "/user-chat/[id]",
              params: {
                id: u.id,
                name: u.username,
                profile: u.profile_pic,
              },
            });
          }
        }}
      >
        <Image source={{ uri: u.profile_pic }} style={style.image} />
        <Text style={style.nameText}>{u.username}</Text>
        {route === "create-group" && (
          <BouncyCheckbox
            size={18}
            fillColor="green"
            unFillColor="#FFFFFF"
            iconStyle={{ borderColor: "grey" }}
            isChecked={isChecked}
            style={{ marginLeft: "auto", marginRight: -8 }}
          />
        )}
      </TouchableOpacity>
    </View>
  ));
}

export function TestContacts({ route }: { route: string }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={{ marginTop: 5 }}>
      <TouchableOpacity
        style={style.resultContainer}
        onPress={() => {
          if (route === "create-group") {
            setIsChecked(!isChecked);
          } else if (route === "create-message") {
            router.navigate({
              pathname: "/user-chat/[id]",
              params: {
                id: 1,
                name: "username,",
                profile: " u.profile_pic",
              },
            });
          }
        }}
      >
        <Image source={{ uri: testImage }} style={style.image} />
        <Text style={style.nameText}>John Doe</Text>
        {route === "create-group" && (
          <BouncyCheckbox
            size={18}
            fillColor="green"
            unFillColor="#FFFFFF"
            iconStyle={{ borderColor: "grey" }}
            isChecked={isChecked}
            style={{ marginLeft: "auto", marginRight: -8 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

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
