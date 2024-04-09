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
import AsyncStorage from "@react-native-async-storage/async-storage";
import PayPal from "react-native-paypal-lib";

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
    let data = await getConfig();
    PayPal.initialize(PayPal.NO_NETWORK, data);
    this.setState({
      sdkReady: true,
    });
    console.log(data);
    const courseId = parseInt(await AsyncStorage.getItem("courseId"));
    console.log(`Fetching course details for ID: ${courseId}`);
    axios
      .get(
        `http://10.25.90.103:8080/api/get-detail-courses-by-id?id=${courseId}`
      )
      .then((response) => {
        this.setState({ detailCourses: response.data.data });
        console.log("ORDERS", response.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }
  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
    console.log(value);
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

    // Make payment
    PayPal.paymentRequest({
      currencyCode: "USD", // Currency code
      amount: this.state.detailCourses.price, // Amount to pay
      intent: PayPal.INTENT.SALE, // Sale intent
    })
      .then((confirm) => this.onSuccessPaypal(confirm))
      .catch((error) => console.error(error));
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
  addPaypalScript = async () => {
    let data = await getConfig();
    PayPal.initialize(PayPal.NO_NETWORK, data);
    this.setState({
      sdkReady: true,
    });
    console.log(data);
  };
  onSuccessPaypal = async (details, data) => {
    const userId = parseInt(await AsyncStorage.getItem("userId"));
    console.log("UserID in Orders: ", userId);
    const orderData = {
      userId,
      username: this.state.username,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
      payment: "PayPal",
      courses: this.state.detailCourses,
      totalPrice: this.state.detailCourses.price,
    };
    console.log("orderData", orderData);
    createOrderService(orderData)
      .then(async (response) => {
        ToastAndroid.show("Order created successfully", ToastAndroid.SHORT);
        let res = await postStudentOrderCourses({
          fullName: this.state.username,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
        });
        if (res && res.errCode === 0) {
          ToastAndroid.show(
            "Order a new courses successfully",
            ToastAndroid.SHORT
          );
        } else {
          ToastAndroid.show("Order a new courses failed!", ToastAndroid.SHORT);
        }
        this.props.addPurchasedCourse(this.state.detailCourses.id);
      })
      .catch((error) => {
        console.error("Error creating order", error);
        // Handle errors here
      });
  };

  render() {
    const { courses, detailCourses } = this.state;
    console.log("COURSES from Order", courses);
    console.log("detailCourses", detailCourses);

    return (
      <ScrollView>
        <View>
          <View key={courses.id}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              value={this.state.username}
              onChangeText={(value) =>
                this.handleInputChange("username", value)
              }
              placeholder="Enter new Username"
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={this.state.email}
              onChangeText={(value) => this.handleInputChange("email", value)}
              placeholder="Enter new Email"
            />
            <Text style={styles.label}>PhoneNumber:</Text>
            <TextInput
              style={styles.input}
              value={this.state.phonenumber}
              onChangeText={(value) =>
                this.handleInputChange("phonenumber", value)
              }
              placeholder="Enter new order"
            />
            <Text style={styles.label}>Pay ment: PAYPAL</Text>
            <Text style={styles.label}>{detailCourses.name}</Text>
            <Text style={styles.label}>Price : {detailCourses.price}</Text>
            <Image style={styles.image} source={{ uri: detailCourses.image }} />

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
  image: {
    marginBottom: 8,
    width: "90%",
    height: 200,
    borderRadius: 10,
    marginLeft: 20,
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
