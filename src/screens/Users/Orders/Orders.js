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

import { Picker } from "@react-native-picker/picker";
// Initialize PayPal with your client id
// import { PayPal } from "react-native-paypal-wrapper";
// PayPal.initialize(
//   PayPal.NO_NETWORK,
//   "AclsyktkK-QOw-GHnMtuC0E1o2j-GcwgkjCe28yVu2VweLCsuv6HVXeiOAhVyyw7KgFl0CAyEraeAQK3"
// );

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
  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
    console.log(value);
  };
  async componentDidMount() {
    const courseId = parseInt(await AsyncStorage.getItem("courseId"));
    console.log(`Fetching course details for ID: ${courseId}`);
    axios
      .get(
        `http://192.168.1.180:8080/api/get-detail-courses-by-id?id=${courseId}`
      )
      .then((response) => {
        this.setState({ detailCourses: response.data.data });
        console.log("ORDERS", response.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }

  handleConfirm = async (event) => {
    event.preventDefault();
    const orderData = {
      fullName: this.state.username,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
    };
    console.log("Orderss", orderData);

    // Request a payment
    // PayPal.paymentRequest({
    //   currency: "USD",
    //   intent: "Sale",
    //   price: this.state.detailCourses.price.toString(), // Amount to pay
    //   description: "Course purchase", // Description for the payment
    // })
    //   .then((response) => this.onSuccessPaypal(response))
    //   .catch((error) => console.error(error));
  };

  onSuccessPaypal = async (details, data) => {
    console.log("Paypal success", details, data);
    const userId = parseInt(await AsyncStorage.getItem("userId"));
    console.log("UserID in Orders: ", userId);
    const orderData = {
      userId,
      username: this.state.username,
      email: this.state.email,
      phonenumber: this.state.phoneNumber,
      payment: "PayPal",
      courses: this.state.detailCourses,
      totalPrice: this.state.detailCourses.price,
    };
    console.log("orderData", this.state.detailCourses);
    axios
      .post(`http://10.25.88.26:8080/api/create-order`, orderData)
      .then(async (response) => {
        console.log("Order created successfully");
        // let res = await axios.post(
        //   `http://10.25.88.26:8080/api/student-order-courses`,
        //   {
        //     fullName: this.state.username,
        //     email: this.state.email,
        //     phoneNumber: this.state.phoneNumber,
        //   }
        // );
        if (res && res.errCode === 0) {
          console.log("Order a new courses successfully");
          this.props.navigation.navigate("CoursesView");
        } else {
          console.log("Order a new courses failed!");
        }
      })
      .catch((error) => {
        console.error("Error creating order", error);
      });
  };
  // validateInput = () => {
  //   const { username, email, phonenumber } = this.state;

  //   // Check if username is not empty
  //   if (!username) {
  //     toast.warning("Username is required");
  //     return false;
  //   }

  //   // Check if email is valid
  //   const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  //   if (!emailRegex.test(email)) {
  //     toast.warning("Email is not valid");
  //     return false;
  //   }

  //   // Check if phone number is valid
  //   const phoneRegex = /^\d{10}$/; // Change this regex to match your country's phone number format
  //   if (!phoneRegex.test(phonenumber)) {
  //     toast.warning("Phone number is not valid");
  //     return false;
  //   }

  //   // If all checks pass, return true
  //   return true;
  // };
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
              value={this.state.phoneNumber}
              onChangeText={(value) =>
                this.handleInputChange("phoneNumber", value)
              }
              placeholder="Enter new order"
            />
            <Picker
              selectedValue={this.state.payment}
              onValueChange={(itemValue) =>
                this.handleInputChange("payment", itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label="PayPal" value="PayPal" />
            </Picker>

            <Text style={styles.label}>{detailCourses.name}</Text>
            <Text style={styles.label}>Price: {detailCourses.price}</Text>
            <Image style={styles.image} source={{ uri: detailCourses.image }} />

            <TouchableOpacity
              style={styles.button}
              onPress={this.handleConfirm}
            >
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
  picker: {
    height: 120,
    width: 150,
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
