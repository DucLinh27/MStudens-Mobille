import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import axios from "axios";
import { Touchable } from "react-native";
import { TouchableOpacity } from "react-native";
import DetailCourses from "./DetailTeacher";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://10.25.90.103:8080/api/get-all-teachers`)
      .then((response) => {
        this.setState({ teachers: response.data.data });
        console.log(response.data.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }

  render() {
    const { teachers } = this.state;
    console.log("teachers", teachers);
    return (
      <ScrollView>
        <View>
          {teachers.map((teacher) => (
            <TouchableOpacity
              key={teacher.id}
              onPress={async () => {
                try {
                  this.props.navigation.navigate("TeacherStacks", {
                    screen: "DetailTeacher",
                    params: { teacherId: teacher.id },
                  });
                  this.setState({
                    teacherId: teacher.id,
                  });
                  await AsyncStorage.setItem(
                    "teacherId",
                    teacher.id.toString()
                  );
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              <View>
                <Text style={styles.name}>{teacher.name}</Text>
                <Image style={styles.image} source={{ uri: teacher.image }} />
              </View>
            </TouchableOpacity>
          ))}
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
});

export default Teacher;
