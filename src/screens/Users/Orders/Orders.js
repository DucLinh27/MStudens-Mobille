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

  async componentDidMount() {
    try {
      const { courses } = this.props.route.params;
      console.log(courses);
      const response = await createOrderService(courses);
      this.setState({ courses: response.data.data });
      console.log(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
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
        this.props.history.push("/payment-return", { orderData });
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
