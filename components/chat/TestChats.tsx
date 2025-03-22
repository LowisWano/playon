import { View, Text, Image } from "react-native";

export default function TestChats({ directMessages }: Readonly<{ directMessages: string[] }>) {
  return (
    <>
      <View style={{ gap: 25, marginBottom: 20 }}>
        {directMessages && directMessages.map((msg, index) => <Text key={index}>{msg}</Text>)}
        <View>
          <Text style={{ color: "grey", padding: 5, fontSize: 12 }}>Kenny Maratas</Text>
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 18,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "white" }}>CHATMATE</Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: "flex-end",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{ width: 15, height: 15, borderRadius: 50 }}
          />
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              backgroundColor: "white",
              borderRadius: 18,
            }}
          >
            <Text style={{ color: "black" }}>YOU</Text>
          </View>
        </View>

        <View>
          <Text style={{ color: "grey", padding: 5, fontSize: 12 }}>Kenny Maratas</Text>
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 18,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "white" }}>CHATMATE</Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: "flex-end",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{ width: 15, height: 15, borderRadius: 50 }}
          />
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              backgroundColor: "white",
              borderRadius: 18,
            }}
          >
            <Text style={{ color: "black" }}>YOU</Text>
          </View>
        </View>

        <View>
          <Text style={{ color: "grey", padding: 5, fontSize: 12 }}>Kenny Maratas</Text>
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 18,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "white" }}>CHATMATE</Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: "flex-end",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{ width: 15, height: 15, borderRadius: 50 }}
          />
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              backgroundColor: "white",
              borderRadius: 18,
            }}
          >
            <Text style={{ color: "black" }}>YOU</Text>
          </View>
        </View>

        <View>
          <Text style={{ color: "grey", padding: 5, fontSize: 12 }}>Kenny Maratas</Text>
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 18,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "white" }}>CHATMATE</Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: "flex-end",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{ width: 15, height: 15, borderRadius: 50 }}
          />
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              backgroundColor: "white",
              borderRadius: 18,
            }}
          >
            <Text style={{ color: "black" }}>YOU</Text>
          </View>
        </View>

        <View>
          <Text style={{ color: "grey", padding: 5, fontSize: 12 }}>Kenny Maratas</Text>
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 18,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "white" }}>CHATMATE</Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: "flex-end",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{ width: 15, height: 15, borderRadius: 50 }}
          />
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              backgroundColor: "white",
              borderRadius: 18,
            }}
          >
            <Text style={{ color: "black" }}>YOU</Text>
          </View>
        </View>

        <View>
          <Text style={{ color: "grey", padding: 5, fontSize: 12 }}>Kenny Maratas</Text>
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 18,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "white" }}>CHATMATE</Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: "flex-end",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{ width: 15, height: 15, borderRadius: 50 }}
          />
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              backgroundColor: "white",
              borderRadius: 18,
            }}
          >
            <Text style={{ color: "black" }}>YOU</Text>
          </View>
        </View>

        <View>
          <Text style={{ color: "grey", padding: 5, fontSize: 12 }}>Kenny Maratas</Text>
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 18,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "white" }}>CHATMATE</Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: "flex-end",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{ width: 15, height: 15, borderRadius: 50 }}
          />
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              backgroundColor: "white",
              borderRadius: 18,
            }}
          >
            <Text style={{ color: "black" }}>YOU</Text>
          </View>
        </View>

        <View>
          <Text style={{ color: "grey", padding: 5, fontSize: 12 }}>Kenny Maratas</Text>
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 18,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "white" }}>CHATMATE</Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: "flex-end",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{ width: 15, height: 15, borderRadius: 50 }}
          />
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              backgroundColor: "white",
              borderRadius: 18,
            }}
          >
            <Text style={{ color: "black" }}>YOU</Text>
          </View>
        </View>

        <View>
          <Text style={{ color: "grey", padding: 5, fontSize: 12 }}>Kenny Maratas</Text>
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 18,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "white" }}>CHATMATE</Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: "flex-end",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{ width: 15, height: 15, borderRadius: 50 }}
          />
          <View
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              backgroundColor: "white",
              borderRadius: 18,
            }}
          >
            <Text style={{ color: "black" }}>YOU</Text>
          </View>
        </View>
      </View>
    </>
  );
}
