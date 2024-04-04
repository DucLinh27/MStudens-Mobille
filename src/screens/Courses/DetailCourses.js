import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native";

class DetailCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    const { courseId } = this.props.route.params;
    console.log(courseId);
    console.log(`Fetching course details for ID: ${courseId}`);
    axios
      .get(
        `http://192.168.1.178:8080/api/get-detail-courses-by-id?id=${courseId}`
      )
      .then((response) => {
        this.setState({ courses: response.data.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }

  render() {
    const { courses } = this.state;
    console.log("CLASSSSSS", courses);
    return (
      <ScrollView>
        <View>
          <View key={courses.id}>
            <Text style={styles.name}>{courses.name}</Text>
            <Image style={styles.image} source={{ uri: courses.image }} />
            <Text style={styles.name}>{courses.description}</Text>
          </View>
        </View>
        <Button
          style={styles.button}
          title="Buy Now"
          onPress={() =>
            this.props.navigation.navigate("Orders", {
              courses: this.state.courses,
            })
          }
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  name: {
    flexGrow: 1,
  },
  image: {
    fontWeight: "bold",
    marginBottom: 8,
    width: "100%",
    height: 200,
  },
  button: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
});

export default DetailCourses;
