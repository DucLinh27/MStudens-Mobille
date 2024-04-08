import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import axios from "axios";
import Video from "react-native-video";
import Constants from "expo-constants";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

class ProfileUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrOrders: [],
    };
  }
  async componentDidMount() {
    try {
      const userId = parseInt(await AsyncStorage.getItem("userId"));
      console.log("UserID in profile: ", userId);

      let ordersArray;

      // Fetch orders
      const response = await axios.get(
        `${BASE_URL}/api/get-order?userId=${userId}`
      );
      console.log("Orders:", response.data);

      const userOrders = response.data.filter(
        (order) => order.userId === userId
      );
      console.log("userOrders : ", userOrders);

      ordersArray = Array.isArray(userOrders)
        ? userOrders
        : Object.values(userOrders);
      this.setState({
        arrOrders: ordersArray,
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  }
  render() {
    const { arrOrders } = this.state;
    // console.log("arrOrders :", arrOrders);
    return (
      <ScrollView>
        <View>
          {arrOrders.map((order) => (
            <View key={order.id}>
              {order.courses && (
                <>
                  <Text style={styles.name}>{order.courses.name}</Text>
                  <Image
                    style={styles.image}
                    source={{ uri: order.courses.image }}
                  />
                </>
              )}
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  try {
                    console.log("ORDERID::", order.id);
                    this.props.navigation.navigate("UserStacks", {
                      screen: "UserCourses",
                      params: { orderId: order.id },
                    });
                    this.setState({
                      orderId: order.id,
                    });
                    await AsyncStorage.setItem("orderId", order.id.toString());
                  } catch (e) {
                    console.log(e);
                  }
                }}
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
