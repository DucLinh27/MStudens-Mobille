import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

class DetailTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
    };
  }

  async componentDidMount() {
    const teacherId = parseInt(await AsyncStorage.getItem("teacherId"));
    console.log(`Fetching course details for ID: ${teacherId}`);
    axios
      .get(
        `http://10.25.90.103:8080/api/get-detail-teacher-by-id?id=${teacherId}`
      )
      .then((response) => {
        this.setState({ teachers: response.data.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }
  render() {
    const { teachers } = this.state;
    console.log("Teachers", teachers);
    return (
      <ScrollView>
        <View>
          <View key={teachers.id}>
            <Image style={styles.image} source={{ uri: teachers.image }} />
            <Text style={styles.name}>Email: {teachers.email}</Text>
            <Text style={styles.name}>
              Full Name: {teachers.firstName} {teachers.lastName}
            </Text>
            <Text style={styles.name}>Level: {teachers.positionId}</Text>
            <Text style={styles.name}>
              Phone Number: {teachers.phonenumber}{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  name: {
    flexGrow: 1,
    fontSize: 20,
    color: "#333",
    marginTop: 20,
    marginLeft: 23,
    marginBottom: 10,
  },
  image: {
    marginBottom: 8,
    width: "90%",
    height: 400,
    borderRadius: 10,
    marginLeft: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "30%",
    marginLeft: 130,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DetailTeacher;
