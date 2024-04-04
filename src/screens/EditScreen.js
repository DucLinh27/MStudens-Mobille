import React, { useState } from "react";
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
} from "react-native";
import Database from "../../Database";

const EditScreen = ({ navigation, route }) => {
  const { todo } = route.params;
  const [id, setId] = useState(todo.id);
  const [name, setName] = useState(todo.name);
  const [location, setLocation] = useState(todo.location);
  const [date, setDate] = useState(new Date());
  const [parking, setParking] = useState(todo.parking);
  const [length, setLength] = useState(todo.length);
  const [level, setLevel] = useState(todo.level);
  const [description, setDescription] = useState(todo.description);
  const handleParking = (option) => {
    setParking(option);
  };
  const [formattedDate, setFormattedDate] = useState(
    date.toISOString().split("T")[0]
  );

  const handleEditHike = async () => {
    try {
      // Check if there are meaningful changes
      const hasChanges =
        name !== todo.name ||
        location !== todo.location ||
        formattedDate !== todo.date ||
        parking !== todo.parking ||
        length !== todo.length ||
        level !== todo.level ||
        description !== todo.description;
      if (!hasChanges) {
        Alert.alert("No Change", "No meaningful changes were made.");
      }
      // Validate required fields are not empty
      if (
        !name ||
        !location ||
        !date ||
        !parking ||
        !length ||
        !level ||
        !description
      ) {
        Alert.alert("Validation Error", "Please fill in all fields.");
        return;
      }
      Alert.alert(
        "Confirm Edit",
        "Are you sure you want to edit this hike?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              const rowsAffected = await Database.editHike(
                id,
                name,
                location,
                formattedDate,
                parking,
                length,
                level,
                description
              );

              if (rowsAffected > 0) {
                navigation.goBack();
              } else {
                Alert.alert(`Hike with ID ${id} not found.`);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert("Error", "Failed to edit the hike. Please try again.");
    }
  };

  const options = ["Yes", "No"];
  console.log(todo.date);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name of the hike:</Text>
      <TextInput
        style={styles.input}
        defaultValue={todo.name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        defaultValue={todo.location}
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
      <View style={styles.radioButtonContainer} defaultValue={todo.parking}>
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
        defaultValue={todo.length}
        onChangeText={setLength}
        placeholder="Enter length"
        multiline
      />
      <Text style={styles.label}>Difficulty level:</Text>
      <Picker
        selectedValue={level}
        defaultValue={todo.level}
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
        defaultValue={todo.description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />
      <TouchableOpacity style={styles.editButton} onPress={handleEditHike}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
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
  editButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  editButtonText: {
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

export default EditScreen;
