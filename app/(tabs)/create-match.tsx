import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";

export default function CreateMatchScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sport, setSport] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [matchType, setMatchType] = useState("");

  // Sports and their match types
  const sportMatchTypes = {
    Basketball: ["3v3", "5v5", "Full Court", "Half Court"],
    Soccer: ["5v5", "7v7", "11v11"],
    Volleyball: ["2v2", "4v4", "6v6", "Beach"],
    Tennis: ["Singles", "Doubles", "Mixed Doubles"],
    Badminton: ["Singles", "Doubles", "Mixed Doubles"],
  };

  // Skill levels
  const skillLevels = ["Beginner", "Intermediate", "Advanced", "Pro"];

  // Available sports
  const sports = Object.keys(sportMatchTypes);

  // Sample locations (you can replace with your own data source)
  const locations = [
    { label: "Central Park", value: "central_park" },
    { label: "YMCA", value: "ymca" },
    { label: "Community Center", value: "community_center" },
    { label: "Sports Complex", value: "sports_complex" },
    { label: "Local Gym", value: "local_gym" },
  ];

  // Get match types for selected sport
  const getMatchTypes = () => {
    return sport ? sportMatchTypes[sport] || [] : [];
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Handle date change
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      const newDate = new Date(date);
      newDate.setFullYear(currentDate.getFullYear());
      newDate.setMonth(currentDate.getMonth());
      newDate.setDate(currentDate.getDate());
      setDate(newDate);
    }
  };

  // Handle time change
  const onTimeChange = (
    event: DateTimePickerEvent,
    selectedTime: Date | undefined
  ) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(true);
    if (selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(currentTime.getHours());
      newDate.setMinutes(currentTime.getMinutes());
      setDate(newDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create New Match</Text>

      {/* Match Title */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Match Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter match title"
          placeholderTextColor="#666"
        />
      </View>

      {/* Match Description */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Match Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe your match"
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Sport Selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sport</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={sports.map((sport) => ({ label: sport, value: sport }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={sport}
          onChange={(item) => {
            setSport(item.value);
            setMatchType("");
          }}
          renderLeftIcon={() => (
            <Ionicons
              style={styles.icon}
              color="#666"
              name="basketball-outline"
              size={20}
            />
          )}
          renderItem={(item) => (
            <View style={styles.item}>
              <Text style={styles.textItem}>{item.label}</Text>
            </View>
          )}
          searchPlaceholder="Search sport..."
          placeholder="Select sport"
        />
      </View>

      {/* Skill Level */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Skill Level</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={skillLevels.map((level) => ({ label: level, value: level }))}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={skillLevel}
          onChange={(item) => {
            setSkillLevel(item.value);
          }}
          renderLeftIcon={() => (
            <Ionicons
              style={styles.icon}
              color="#666"
              name="trophy-outline"
              size={20}
            />
          )}
          renderItem={(item) => (
            <View style={styles.item}>
              <Text style={styles.textItem}>{item.label}</Text>
            </View>
          )}
          placeholder="Select skill level"
        />
      </View>

      {/* Location/Venue */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location/Venue</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={locations}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={location}
          onChange={(item) => {
            setLocation(item.value);
          }}
          renderLeftIcon={() => (
            <Ionicons
              style={styles.icon}
              color="#666"
              name="location-outline"
              size={20}
            />
          )}
          renderItem={(item) => (
            <View style={styles.item}>
              <Text style={styles.textItem}>{item.label}</Text>
            </View>
          )}
          searchPlaceholder="Search location..."
          placeholder="Select location"
        />
      </View>

      {/* Date/Time */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date & Time</Text>
        <View style={styles.dateTimeContainer}>
          {/* Date Selection */}
          <TouchableOpacity
            style={[styles.dateButton, styles.dateTimeButton]}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons
              style={styles.dateIcon}
              color="#666"
              name="calendar-outline"
              size={20}
            />
            <Text style={styles.dateButtonText}>{formatDate(date)}</Text>
          </TouchableOpacity>

          {/* Time Selection */}
          <TouchableOpacity
            style={[styles.dateButton, styles.dateTimeButton]}
            onPress={() => setShowTimePicker(true)}
          >
            <Ionicons
              style={styles.dateIcon}
              color="#666"
              name="time-outline"
              size={20}
            />
            <Text style={styles.dateButtonText}>{formatTime(date)}</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
            textColor="#252422"
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onTimeChange}
            textColor="#252422"
          />
        )}
      </View>

      {/* Match Type - Sport Dependent */}
      {sport && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Match Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={matchType}
              onValueChange={setMatchType}
              style={styles.picker}
              dropdownIconColor="#666"
            >
              <Picker.Item label="Select match type" value="" color="#666" />
              {getMatchTypes().map((type) => (
                <Picker.Item
                  key={type}
                  label={type}
                  value={type}
                  color="#252422"
                />
              ))}
            </Picker>
          </View>
        </View>
      )}

      {/* Create Button */}
      <TouchableOpacity style={styles.createButtonContainer}>
        <LinearGradient
          colors={["#D9AEFB", "#918CF7"]}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>Create Match</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#252422",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#252422",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dropdown: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#666",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#252422",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "#252422",
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: "#252422",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    zIndex: 1000,
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#252422",
    backgroundColor: "#fff",
  },
  pickerItem: {
    fontSize: 16,
    color: "#252422",
  },
  dateButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  dateIcon: {
    marginRight: 8,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#252422",
    flex: 1,
  },
  createButtonContainer: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 8,
    overflow: "hidden",
  },
  createButton: {
    padding: 16,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  dateTimeButton: {
    flex: 1,
  },
});
