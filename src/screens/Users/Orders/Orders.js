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
import {
  createOrderService,
  postStudentOrderCourses,
} from "../../../services/orderServices";
import getConfig from "../../../services/paymentServices";
import { TouchableOpacity } from "react-native";
class Orders extends React.Component {
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

  async componentDidMount() {
    if (!window.paypal) {
      this.addPaypalScript();
    } else {
      this.setState({
        sdkReady: true,
      });
    }
    if (this.props.location.state) {
      const { coursePrice, detailCourses } = this.props.location.state;
      this.setState({ coursePrice, detailCourses });
    }
  }
  handleOnChangeInput = (event, id) => {
    console.log(event.target.value);
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleConfirm = async (event) => {
    event.preventDefault();
    if (!this.validateInput()) {
      return;
    }
    this.setState({ showPaypal: true });
    const orderData = {
      fullName: this.state.username,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
    };
    console.log(orderData);
  };
  addPaypalScript = async () => {
    let data = await getConfig();
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      this.setState({
        sdkReady: true,
      });
    };
    document.body.appendChild(script);
    console.log(data);
  };
  onSuccessPaypal = async (details, data) => {
    toast.success("Payment completed successfully", details, data);
    const userId = this.props.userIdNormal || this.props.userIdGoogle;
    const orderData = {
      userId,
      username: this.state.username,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
      payment: "PayPal",
      courses: this.state.detailCourses,
      totalPrice: this.state.coursePrice,
    };
    console.log(orderData);
    createOrderService(orderData)
      .then(async (response) => {
        toast.success("Order created successfully", response);
        let res = await postStudentOrderCourses({
          fullName: this.state.username,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
        });
        if (res && res.errCode === 0) {
          toast.success("Order a new courses successfully");
        } else {
          toast.error("Order a new courses failed!");
        }
        this.props.addPurchasedCourse(this.state.detailCourses.id);
      })
      .catch((error) => {
        console.error("Error creating order", error);
        // Handle errors here
      });
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
              style={styles.input}
              value={this.state.username}
              onChangeText={this.handleInputChange}
              placeholder="Enter new Username"
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={this.state.email}
              onChangeText={this.handleInputChange}
              placeholder="Enter new Email"
            />
            <Text style={styles.label}>PhoneNumber:</Text>
            <TextInput
              style={styles.input}
              value={this.state.phonenumber}
              onChangeText={this.handleInputChange}
              placeholder="Enter new order"
            />
            <Text style={styles.label}>Pay ment: PAYPAL</Text>

            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    color: "#333",
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 5,
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

export default Orders;
