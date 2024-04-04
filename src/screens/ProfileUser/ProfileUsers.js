import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import axios from "axios";

class ProfileUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    const { courseId } = this.props.route.params;

    axios
      .get(`http://192.168.1.178:8080/api/get-detail-courses-by-id/${courseId}`)
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
    console.log("CLASSSSSS", courses);
    return (
      <ScrollView>
        <View>
          {courses.map((course) => (
            <View key={course.id}>
              <Text style={styles.name}>{course.name}</Text>
              <Image style={styles.image} source={{ uri: course.image }} />
            </View>
          ))}
        </View>
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
});

export default ProfileUsers;
