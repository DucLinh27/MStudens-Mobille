import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from "react-native";
import Database from "../../Database";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
const EntryScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [parking, setParking] = useState(null);
  const [length, setLength] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const [formattedDate, setFormattedDate] = useState(
    date.toISOString().split("T")[0]
  );

  const handleConfirmAddHike = async () => {
    // Show the confirmation modal
    setConfirmationModalVisible(true);

    await Database.addHike(
      name,
      location,
      formattedDate,
      parking,
      length,
      level,
      description
    );
    Alert.alert("Success", "Hike added successfully!");
    navigation.goBack();
  };

  const handleCancelAddHike = () => {
    // Hide the confirmation modal
    setConfirmationModalVisible(false);
    Alert.alert("Canceled", "Hike addition canceled.");
  };
  useEffect(() => {
    // Reset confirmation modal visibility when component mounts
    setConfirmationModalVisible(false);
  }, []);
  const handleAddHike = async () => {
    if (
      !name ||
      !location ||
      !date ||
      !parking ||
      !length ||
      !level ||
      !description
    ) {
      Alert.alert("Error", "Please enter the fields ");
      return;
    }
    // Display the confirmation modal
    setConfirmationModalVisible(true);
  };
  const handleParking = (option) => {
    setParking(option);
  };
  const options = ["Yes", "No"];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name of the hike:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
        multiline
      />
      <Text style={styles.label}>Date of the hike:</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="spinner"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || date;
          setDate(currentDate);
          setFormattedDate(currentDate.toISOString().split("T")[0]);
        }}
      />
      <Text style={styles.label}>Selected Date:</Text>
      <Text style={styles.dateText}>{formattedDate}</Text>
      <Text style={styles.label}>Parking available:</Text>
      <View style={styles.radioButtonContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.radioButton,
              parking === option && styles.radioButtonSelected,
            ]}
            onPress={() => handleParking(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Length of the hike:</Text>
      <TextInput
        style={styles.input}
        value={length}
        onChangeText={setLength}
        placeholder="Enter length"
        multiline
      />
      <Text style={styles.label}>Difficulty level:</Text>
      <Picker
        selectedValue={level}
        style={styles.input}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue, itemIndex) => setLevel(itemValue)}
      >
        <Picker.Item label="Beginner" value="beginner" />
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Normal" value="normal" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="High" value="high" />
      </Picker>
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddHike}>
        <Text style={styles.addButtonText}>Add Hike</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmationModalVisible}
        onRequestClose={() => setConfirmationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Confirm Hike Information</Text>
            {/* Display confirmed information */}
            <Text>Name: {name}</Text>
            <Text>Location: {location}</Text>
            <Text>Date: {date.toISOString().split("T")[0]}</Text>
            <Text>Parking: {parking}</Text>
            <Text>Length: {length}</Text>
            <Text>Level: {level}</Text>
            <Text>Description: {description}</Text>

            {/* Add other fields as needed */}
            <TouchableOpacity
              style={[styles.confirmButton, { backgroundColor: "green" }]}
              onPress={handleConfirmAddHike}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, { backgroundColor: "red" }]}
              onPress={handleCancelAddHike}
            >
              <Text style={styles.confirmButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  addButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  radioButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    alignItems: "center",
  },
  radioButtonSelected: {
    backgroundColor: "green",
  },
  pickerItem: {
    fontSize: 20,
    height: 60,
  },
  //Add confirmation
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  confirmButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  addButton: {
    backgroundColor: "#4CAF50", // Use a color that fits your design
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20, // Add some bottom margin for spacing
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  dateText: {
    marginBottom: 5,
  },
  container: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensure equal spacing between buttons
  },
  radioButton: {
    flex: 1, // Take up equal space
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50, // Make it circular
    padding: 12, // Adjust padding for better appearance
    marginRight: 8, // Add some spacing between buttons
  },
  radioButtonSelected: {
    backgroundColor: "green",
  },
});

export default EntryScreen;
