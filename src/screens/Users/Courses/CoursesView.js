import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import axios from "axios";
import { Touchable } from "react-native";
import { TouchableOpacity } from "react-native";
import DetailCourses from "./DetailCourses";
import { BASE_URL } from "@env";

class CoursesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://10.25.90.103:8080/api/get-all-courses`)
      .then((response) => {
        this.setState({ courses: response.data.data });
        console.log(response.data.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }

  render() {
    const { courses } = this.state;
    console.log("COURSES", courses);
    return (
      <ScrollView>
        <View>
          {courses.map((course) => (
            <TouchableOpacity
              key={course.id}
              onPress={() =>
                this.props.navigation.navigate("CoursesStacks", {
                  screen: "DetailCourses",
                  params: { courseId: course.id },
                })
              }
            >
              <View>
                <Text style={styles.name}>{course.name}</Text>
                <Image style={styles.image} source={{ uri: course.image }} />
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
    height: 200,
    borderRadius: 10,
    marginLeft: 20,
  },
});

export default CoursesView;
