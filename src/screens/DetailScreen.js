import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DetailScreen = ({ route }) => {
  const { todo } = route.params;
  console.log("Received todo:", todo);
  const formatDate = (date) => {
    console.log(date);
    const isValidDate = (date) => {
      return date instanceof Date && !isNaN(date);
    };

    return isValidDate(date)
      ? new Date(date).toISOString().split("T")[0]
      : "N/A";
  };

  // Call formatDate with todo.date to get the formatted date
  const formattedDateValue = formatDate(todo.date);
  console.log(formattedDateValue);

  return (
    <View style={styles.container}>
      <View style={styles.detailGroup}>
        <View style={styles.rows}>
          <Text style={styles.name}>Name: {todo.name}</Text>
          <Text style={styles.location}>Location: {todo.location}</Text>
          <Text style={styles.date}>Date: {todo.date}</Text>
          <Text style={styles.parking}>Parking: {todo.parking}</Text>
          <Text style={styles.length}>Length: {todo.length}</Text>
          <Text style={styles.level}>Level: {todo.level}</Text>
          <Text style={styles.description}>
            Description: {todo.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  location: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  date: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },

  length: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  level: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  description: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  parking: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
});

export default DetailScreen;
