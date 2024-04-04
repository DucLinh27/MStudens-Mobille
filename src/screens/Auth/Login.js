import React, { Component } from "react";
import { handleLoginApi } from "../../services/userServices";
import { Button, TextInput, View } from "react-native";
import { Text } from "react-native";
import { Alert } from "react-native";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  handleOnChangeUserName = (username, value) => {
    this.setState({
      [username]: value,
    });
  };
  handleOnChangePassword = (password, value) => {
    this.setState({
      [password]: value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      console.log("Data:", data.data);
      if (data.data && data.data.errCode === 0) {
        Alert.alert("Success", "Login successful"); // Display success message
        this.props.navigation.navigate("HomeNavigation", {
          screen: "MSTUDENTS",
        }); // Navigate to MSTUDENTS
      } else {
        this.setState({
          errMessage: data.message,
        });
        console.log(data.message);
        Alert.alert("Failure", data.message); // Display failure message
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
          Alert.alert("Error", e.response.data.message); // Display error message
        }
      }
      console.log("error message", e.response);
    }
  };
  render() {
    return (
      <View>
        <Text>Username:</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(value) =>
            this.handleOnChangeUserName("username", value)
          }
        />
        <Text>Password:</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={(value) =>
            this.handleOnChangePassword("password", value)
          }
        />
        <Button title="Submit" onPress={this.handleLogin} />
      </View>
    );
  }
}

export default Login;
