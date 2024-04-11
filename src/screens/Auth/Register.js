import React, { Component } from "react";
import { Button, TextInput, View, Text } from "react-native";
import createRegisterUserServices from "../../services/userServices";
import axios from "axios";
import { Alert } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { BASE_URL } from "@env";
axios.defaults.timeout = 20000;
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
    console.log(value);
  };
  registerNewUser = async (userData) => {
    try {
      const response = await axios.post(
        `http://192.168.1.180:8080/api/registerNewUser`,
        userData
      );
      return response;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, firstName, lastName, address } = this.state;
    // Validate the fields
    if (!email || !password || !firstName || !lastName || !address) {
      Alert.alert("Error", "All fields must be filled");
      return;
    }
    // Validate password length
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Email is not in correct format");
      return;
    }
    try {
      const response = await this.registerNewUser({
        email,
        password,
        firstName,
        lastName,
        address,
      });

      console.log(response.data);
      if (response.data && response.data.errCode === 0) {
        Alert.alert("Success", "Registration successful");
        console.log("Success", response.data.errCode);
      } else {
        Alert.alert("Failure", "Registration failed");
        console.log("Failure", response.data.errCode);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert("Error", "An error occurred during registration");
    }
  };

  render() {
    return (
      <View>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(value) => this.handleInputChange("email", value)}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(value) => this.handleInputChange("password", value)}
        />
        <Text style={styles.label}>FirstName:</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={(value) => this.handleInputChange("firstName", value)}
        />
        <Text style={styles.label}>LastName:</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(value) => this.handleInputChange("lastName", value)}
        />
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={(value) => this.handleInputChange("address", value)}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
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
export default Register;
