import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Database from "../../Database";
const HomeScreen = ({ navigation }) => {
  const [hikeApp, setHikes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Database.getHike();
        console.log("Received data:", data);
        setHikes(data);
      } catch (error) {
        console.log("Error fetching hikeApp", error);
      }
    };

    fetchData();
  }, [isFocused]);

  const handleDeleteHike = async (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this hike?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            // Proceed with the deletion if the user confirms
            await Database.deleteHike(id);
            const data = await Database.getHike();
            setHikes(data);
          },
        },
      ],
      { cancelable: false }
    );
  };
  const handleDeleteAllHike = async () => {
    Alert.alert(
      "Confirm Delete All",
      "Are you sure you want to delete all hikes?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            // Proceed with the deletion if the user confirms
            await Database.deleteAllHike();
            const data = await Database.getHike();
            setHikes(data);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderHikeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.todoItem}
      onPress={() => navigation.navigate("Detail", { todo: item })}
    >
      <Text>{item.name}</Text>
      <Text>{item.location}</Text>
      <Text>{item.date}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("Edit", { todo: item })}
      >
        <Text style={styles.editButtonText}>More</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteHike(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hikeApp}
        renderItem={renderHikeItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add Hike")}
      >
        <Text style={styles.addButtonText}>Add Hike</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteAllButton}
        onPress={handleDeleteAllHike}
      >
        <Text style={styles.deleteAllButtonText}>Delete All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "white",
  },
  editButton: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 4,
  },
  editButtonText: {
    color: "white",
  },
  deleteAllButton: {
    backgroundColor: "red",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },

  deleteAllButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteAllButton: {
    backgroundColor: "red",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "green",
    padding: 16,
    marginBottom: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
