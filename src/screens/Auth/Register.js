import React, { Component } from "react";
import { Button, TextInput, View, Text } from "react-native";
import createRegisterUserServices from "../../services/userServices";
import axios from "axios";
import { Alert } from "react-native";
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
        "http://192.168.1.178:8080/api/registerNewUser",
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

    try {
      const response = await this.registerNewUser({
        email,
        password,
        firstName,
        lastName,
        address,
      });

      console.log(response);
      if (response.status === 200) {
        Alert.alert("Success", "Registration successful");
        console.log("Success", "Registration successful");
      } else {
        Alert.alert("Failure", "Registration failed");
        console.log("Failure", "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert("Error", "An error occurred during registration");
    }
  };

  render() {
    return (
      <View>
        <Text>Email:</Text>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => this.handleInputChange("email", value)}
        />
        <Text>Password:</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={(value) => this.handleInputChange("password", value)}
        />
        <Text>FirstName:</Text>
        <TextInput
          placeholder="First Name"
          onChangeText={(value) => this.handleInputChange("firstName", value)}
        />
        <Text>LastName:</Text>
        <TextInput
          placeholder="Last Name"
          onChangeText={(value) => this.handleInputChange("lastName", value)}
        />
        <Text>Address:</Text>
        <TextInput
          placeholder="Address"
          onChangeText={(value) => this.handleInputChange("address", value)}
        />
        <Button title="Register" onPress={this.handleSubmit} />
      </View>
    );
  }
}

export default Register;
