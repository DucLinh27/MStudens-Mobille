import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native";
import { BASE_URL } from "@env";

class DetailCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    const { route } = this.props;
    if (route && route.params && route.params.courseId) {
      const { courseId } = route.params;
      console.log(courseId);
      console.log(`Fetching course details for ID: ${courseId}`);
      axios
        .get(
          `http://10.25.90.103:8080/api/get-detail-courses-by-id?id=${courseId}`
        )
        .then((response) => {
          this.setState({ courses: response.data.data });
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu:", error);
        });
    } else {
      console.error("No courseId provided");
    }
  }

  render() {
    const { courses } = this.state;
    console.log("COURSES", courses);
    return (
      <ScrollView>
        <View>
          <View key={courses.id}>
            <Text style={styles.name}>{courses.name}</Text>
            <Image style={styles.image} source={{ uri: courses.image }} />
            <Text style={styles.name}>{courses.description}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.props.navigation.navigate("OrderStacks", {
              screen: "Orders",
              params: { courses: this.state.courses },
            })
          }
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
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

export default DetailCourses;
