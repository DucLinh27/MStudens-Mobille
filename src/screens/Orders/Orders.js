import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";

class DetailCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      username: "",
      email: "",
      phonenumber: "",
      payment: "PayPal",
      courses: "",
      coursePrice: "",
      detailCourses: "",
    };
  }

  componentDidMount() {
    const { courses } = this.props.route.params;
    console.log(courses);

    axios
      .get(`http://192.168.1.178:8080/api/create-order`)
      .then((response) => {
        this.setState({ courses: response.data.data });
        console.log(response.data.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }
  handleInputChange = (text) => {
    this.setState({ newOrder: text });
  };

  handleSubmit = () => {
    // Code to submit the new order goes here
  };
  render() {
    const { courses } = this.state;
    console.log("CLASSSSSS", courses);
    return (
      <ScrollView>
        <View>
          <View key={courses.id}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              value={this.state.username}
              onChangeText={this.handleInputChange}
              placeholder="Enter new Username"
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
              value={this.state.email}
              onChangeText={this.handleInputChange}
              placeholder="Enter new Email"
            />
            <Text style={styles.label}>PhoneNumber:</Text>
            <TextInput
              value={this.state.phonenumber}
              onChangeText={this.handleInputChange}
              placeholder="Enter new order"
            />
            <Text style={styles.label}>Pay ment: PAYPAL</Text>

            <Button title="Submit" onPress={this.handleSubmit} />
          </View>
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

export default DetailCourses;
