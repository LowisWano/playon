import { View, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "@/context/auth-context";
import { useInboxData } from "@/hooks/useInboxData";
import LatestChatmates from "@/components/inbox/LatestChatmates";
import OnlineChatmates from "@/components/inbox/OnlineChatmates";
import SearchChatmateBar from "@/components/inbox/SearchMessagesBar";

const testdata = [
  {
    id: 1,
    name: "BROTHA 112321",
    type: "group",
    image:
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    name: "Gaming Squad",
    type: "group",
    image:
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    name: "Project Team",
    type: "group",
    image:
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Family",
    type: "group",
    image:
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 5,
    name: "Weekend Plans",
    type: "group",
    image:
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 6,
    name: "Study Group",
    type: "group",
    image:
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 7,
    name: "Work Team",
    type: "group",
    image:
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 8,
    name: "Basketball Team",
    type: "group",
    image:
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 9,
    name: "Movie Night",
    type: "group",
    image:
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 10,
    name: "VacationPlanning",
    type: "group",
    image:
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
];

export default function InboxScreen() {
  const { id } = useAuth();
  const { inboxData, isLoading } = useInboxData(id);

  // probably no need loading state for better UX since its component --
  // -- is always refreshing
  console.log(inboxData, isLoading, "CHAT DATA");

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchChatmateBar data={testdata} inboxData={inboxData} />
        <OnlineChatmates data={testdata} inboxData={inboxData} />
        <LatestChatmates data={testdata} inboxData={inboxData} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252422",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 10,
  },
  text: {
    color: "#fff",
  },
});
