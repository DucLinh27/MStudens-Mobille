import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import axios from "axios";
import Video from "react-native-video";
import Constants from "expo-constants";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
class ProfileUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }
  async componentDidMount() {
    try {
      const userId = 2;

      if (!userId) {
        console.error("No user ID provided");
        return;
      }
      console.log("UserID", userId);
      // Fetch orders for the specific user
      const response = await axios.get(
        `http://192.168.1.178:8080/api/get-order?userId=${userId}`
      );
      console.log("Orders:", response.data);
      this.setState({ orders: response.data });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  }
  render() {
    const { orders } = this.state;
    console.log("ORDERS", orders);
    return (
      <ScrollView>
        <View>
          {orders.map((order) => (
            <View key={order.id}>
              <Text style={styles.name}>{order.courses.name}</Text>
              <Image
                style={styles.image}
                source={{ uri: order.courses.image }}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  this.props.navigation.navigate("UserStacks", {
                    screen: "UserCourses",
                    params: { orderId: order.id },
                  })
                }
              >
                <Text style={styles.buttonText}>See Now</Text>
              </TouchableOpacity>
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
    fontSize: 20,
    color: "#333",
    marginTop: 20,
    marginLeft: 23,
    marginBottom: 10,
  },
  image: {
    fontWeight: "bold",
    marginBottom: 8,
    width: "90%",
    height: 200,
    borderRadius: 10,
    marginLeft: 20,
  },
  video: {
    fontWeight: "bold",
    marginBottom: 8,
    width: "100%",
    height: 200,
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

export default ProfileUsers;
