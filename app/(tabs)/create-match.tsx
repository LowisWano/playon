import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Switch,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export default function CreateMatchScreen() {
  const [sport, setSport] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [skillLevel, setSkillLevel] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleCreateMatch = () => {
    console.log({
      sport,
      venue,
      date,
      time,
      skillLevel,
      isPublic,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Match</Text>

        {/* Sport Selection */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sport</Text>
          <TextInput
            style={styles.input}
            placeholder="Select sport"
            placeholderTextColor="#a0a0a0"
            value={sport}
            onChangeText={setSport}
          />
        </View>

        {/* Venue */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Venue</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter venue"
            placeholderTextColor="#a0a0a0"
            value={venue}
            onChangeText={setVenue}
          />
        </View>

        {/* Date */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
              if (selectedDate) setDate(selectedDate);
            }}
            style={styles.dateTimePicker}
          />
        </View>

        {/* Time */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Time</Text>
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
              if (selectedDate) setTime(selectedDate);
            }}
            style={styles.dateTimePicker}
          />
        </View>

        {/* Skill Level */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Skill Level</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter skill level"
            placeholderTextColor="#a0a0a0"
            value={skillLevel}
            onChangeText={setSkillLevel}
          />
        </View>

        {/* Access Type */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Match Access</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              {isPublic ? "Public" : "Invite Only"}
            </Text>
            <Switch
              value={isPublic}
              onValueChange={setIsPublic}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isPublic ? "#007AFF" : "#f4f3f4"}
            />
          </View>
        </View>
      </ScrollView>

      {/* Create Match Button */}
      <View style={styles.footer}>
        <Pressable style={styles.createButton} onPress={handleCreateMatch}>
          <Text style={styles.buttonText}>Create Match</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 16,
    color: "#fff",
  },
  dateTimePicker: {
    height: 50,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: "#fff",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  createButton: {
    backgroundColor: "#007AFF",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
