import React, { Component } from "react";
import { handleLoginApi } from "../../services/userServices";
import { Button, TextInput, View } from "react-native";
import { Text } from "react-native";
import { Alert } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "1052696457949-iefguoppirjrg1q8t2l3ns6epgtu2ggs.apps.googleusercontent.com",
});
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userId: "",
    };
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.error(error);
    }
  };
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
      if (!data.data || !data.data.user) {
        throw new Error("Unexpected response structure");
      }
      let userIds = data.data.user.id;
      console.log("Data:", data.data, "UserIds:", userIds);
      if (data.data && data.data.errCode === 0) {
        Alert.alert("Success", "Login successful");
        this.props.navigation.navigate("HomeNavigation", {
          screen: "Mstudents",
          params: { userId: userIds },
        });
        try {
          await AsyncStorage.setItem("userId", userIds.toString());
        } catch (e) {
          console.log(e);
        }
        this.setState({ userId: userIds });
        console.log("ProfileUserIds:", userIds);
      } else {
        this.setState({
          errMessage: data.message,
        });
        console.log(data.message);
        Alert.alert("Failure", "User not found"); // Display failure message
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
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(value) =>
            this.handleOnChangeUserName("username", value)
          }
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(value) =>
            this.handleOnChangePassword("password", value)
          }
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signIn}>
          <Text>Sign in with Google</Text>
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
export default Login;
